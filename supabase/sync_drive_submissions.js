/**
 * Automated Google Drive Submission Synchronizer
 * Downloads all PPT/PPTX files submitted to Supabase Storage and organizes them locally
 * into team-specific folders ready for Google Drive upload/sync.
 * Usage: node supabase/sync_drive_submissions.js
 */

const fs = require('fs');
const path = require('path');

// Auto-load frontend/.env file
const envPath = path.join(__dirname, '../frontend/.env');
if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

let createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (e) {
  createClient = require('../frontend/node_modules/@supabase/supabase-js').createClient;
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or Key missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncSubmissionsToDriveFolders() {
  console.log('=== STARTING AUTOMATED SUBMISSION DRIVE SYNC ===');
  const baseDriveDir = path.join(__dirname, '../submissions_drive');
  fs.mkdirSync(baseDriveDir, { recursive: true });

  const { data: rootItems, error: listErr } = await supabase.storage
    .from('agentic-ai-submissions')
    .list();

  if (listErr) {
    console.error('Error listing storage bucket:', listErr.message);
    return;
  }

  console.log(`Found ${rootItems.length} items/folders in Supabase storage bucket...`);

  for (const item of rootItems) {
    // If folder or team object
    const teamFolder = item.name;
    const { data: teamFiles, error: filesErr } = await supabase.storage
      .from('agentic-ai-submissions')
      .list(teamFolder);

    if (filesErr || !teamFiles || teamFiles.length === 0) continue;

    // Filter valid non-empty files and sort by newest first
    const validFiles = teamFiles.filter(f => f.metadata && f.metadata.size > 0);
    if (validFiles.length === 0) continue;

    validFiles.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    const newestFile = validFiles[0];

    const destDir = path.join(baseDriveDir, teamFolder);
    fs.mkdirSync(destDir, { recursive: true });

    const filePath = `${teamFolder}/${newestFile.name}`;
    const ext = path.extname(newestFile.name) || '.pptx';
    const localFileName = `${teamFolder}_Presentation${ext}`;
    const localPath = path.join(destDir, localFileName);

    console.log(`Syncing ${filePath} -> ${localPath}...`);
    const { data: fileData, error: downloadErr } = await supabase.storage
      .from('agentic-ai-submissions')
      .download(filePath);

    if (downloadErr) {
      console.error(`  └─ Download error for ${filePath}:`, downloadErr.message);
      continue;
    }

    const buffer = Buffer.from(await fileData.arrayBuffer());
    fs.writeFileSync(localPath, buffer);
    console.log(`  └─ ✓ Organized presentation file: ${localFileName} (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`);

    // Direct Google Drive API v3 Cloud Upload (if Access Token is provided)
    const driveAccessToken = process.env.GOOGLE_DRIVE_ACCESS_TOKEN;
    const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd';

    if (driveAccessToken) {
      try {
        console.log(`  └─ Uploading directly to Google Drive API (Folder ID: ${driveFolderId})...`);
        const mimeType = ext === '.ppt' ? 'application/vnd.ms-powerpoint' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        const driveRes = await uploadFileToGoogleDriveApi(localFileName, mimeType, buffer, driveFolderId, driveAccessToken);
        if (driveRes && driveRes.id) {
          console.log(`  └─ ✓ Successfully uploaded to Google Drive API (File ID: ${driveRes.id})`);
        } else {
          console.warn(`  └─ Google Drive API upload notice:`, driveRes);
        }
      } catch (err) {
        console.warn(`  └─ Google Drive API upload exception:`, err.message);
      }
    }
  }

  console.log('=== AUTOMATED DRIVE SUBMISSION SYNC COMPLETE ===');
  console.log(`All files organized locally in: ${baseDriveDir}`);
}

/**
 * Upload file directly to Google Drive API v3 via multipart HTTP
 */
async function uploadFileToGoogleDriveApi(fileName, mimeType, fileBuffer, folderId, accessToken) {
  const metadata = {
    name: fileName,
    parents: [folderId]
  };

  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  const bodyHead = delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: ' + mimeType + '\r\n\r\n';

  const payload = Buffer.concat([
    Buffer.from(bodyHead, 'utf8'),
    fileBuffer,
    Buffer.from(close_delim, 'utf8')
  ]);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary="${boundary}"`,
      'Content-Length': payload.length
    },
    body: payload
  });

  return await response.json();
}

function startWatchMode(intervalMs = 15000) {
  console.log(`Starting automated submission sync watcher (interval: ${intervalMs / 1000}s)...`);
  syncSubmissionsToDriveFolders();
  setInterval(syncSubmissionsToDriveFolders, intervalMs);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--watch') || args.includes('-w')) {
    startWatchMode();
  } else {
    syncSubmissionsToDriveFolders();
  }
}

module.exports = { syncSubmissionsToDriveFolders, startWatchMode };
