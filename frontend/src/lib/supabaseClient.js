import { createClient } from '@supabase/supabase-js';
import seedData from '../data/seedData.json';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage key for persistent local mode state
const STORAGE_KEY_SESSION = 'delta_event_session';
const STORAGE_KEY_SUBMISSIONS = 'delta_event_submissions';

function getLocalSubmissions() {
  const data = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
  return data ? JSON.parse(data) : [];
}

function saveLocalSubmissions(submissions) {
  localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissions));
}

export function removeLocalSubmission(teamCode) {
  if (!teamCode) return;
  const cleanCode = teamCode.toUpperCase();
  const num = parseInt(cleanCode.replace(/\D/g, ''), 10);
  const altCode1 = num ? `AIPS-T${String(num).padStart(2, '0')}` : cleanCode;
  const altCode2 = num ? `TEAM${String(num).padStart(2, '0')}` : cleanCode;

  const submissions = getLocalSubmissions().filter(s => {
    if (!s || !s.teamCode) return false;
    const sc = s.teamCode.toUpperCase();
    return sc !== cleanCode && sc !== altCode1 && sc !== altCode2;
  });
  saveLocalSubmissions(submissions);
}

export function clearAllLocalSubmissions() {
  localStorage.removeItem(STORAGE_KEY_SUBMISSIONS);
}

/**
 * Universal Login function (Team & Admin)
 */
export async function loginUser({ eventSlug, code, password, role }) {
  const cleanCode = code ? code.trim().toUpperCase() : '';

  // 1. Try Supabase Auth if available
  if (supabase) {
    try {
      let email = '';
      if (role === 'team') {
        email = `${cleanCode.toLowerCase()}@deltacce.org`;
      } else if (role === 'admin') {
        email = 'admin@deltacce.org';
      }

      if (email) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.session) {
          const sessionObj = {
            role,
            eventSlug: eventSlug || seedData.event.slug,
            code: cleanCode,
            user: data.user,
            token: data.session.access_token
          };
          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionObj));
          return { success: true, session: sessionObj };
        }
      }
    } catch (e) {
      console.warn('Supabase auth attempt failed, checking database credentials:', e);
    }
  }

  // 2. Verified fallback against Seed Data
  if (role === 'team') {
    const team = seedData.teams.find(t => t.teamCode.toUpperCase() === cleanCode);
    if (team && team.password === password) {
      const sessionObj = {
        role: 'team',
        eventSlug: eventSlug || seedData.event.slug,
        code: team.teamCode,
        teamNumber: team.teamNumber,
        teamData: team
      };
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionObj));
      return { success: true, session: sessionObj };
    }
  } else if (role === 'admin') {
    const isAdminUser = (cleanCode === seedData.adminCredentials.username || cleanCode === 'ADMIN');
    if (isAdminUser && password === seedData.adminCredentials.password) {
      const sessionObj = {
        role: 'admin',
        eventSlug: eventSlug || seedData.event.slug,
        code: 'AIPS-ADMIN'
      };
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionObj));
      return { success: true, session: sessionObj };
    }
  }

  return { success: false, error: 'Invalid ID or Password.' };
}

/**
 * Get active user session
 */
export function getCurrentSession() {
  const sessionStr = localStorage.getItem(STORAGE_KEY_SESSION);
  if (!sessionStr) return null;
  try {
    return JSON.parse(sessionStr);
  } catch (e) {
    return null;
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
  }
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

/**
 * Validate GitHub URL
 */
export function validateGithubUrl(url) {
  if (!url) return false;
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
  return githubRegex.test(url.trim());
}

/**
 * Upload Presentation PPT/PPTX file to Supabase Storage
 */
export async function uploadPresentationFile(teamCode, file) {
  const fileName = file.name;
  const fileExt = fileName.split('.').pop().toLowerCase();
  
  if (!['ppt', 'pptx'].includes(fileExt)) {
    return { success: false, error: 'Invalid file format. Only .ppt and .pptx files are allowed.' };
  }

  const MAX_SIZE_MB = 50;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { success: false, error: `File size exceeds maximum limit of ${MAX_SIZE_MB}MB.` };
  }

  const sanitizedCode = teamCode.toUpperCase();
  const filePath = `${sanitizedCode}/presentation_${Date.now()}.${fileExt}`;

  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from('agentic-ai-submissions')
        .upload(filePath, file, { upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('agentic-ai-submissions')
          .getPublicUrl(filePath);

        return {
          success: true,
          filePath: filePath,
          fileUrl: publicUrlData?.publicUrl || '',
          fileName: fileName
        };
      } else if (error) {
        console.warn('Supabase storage upload error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase storage upload exception:', e);
    }
  }

  // Fallback data-url storage representation
  return {
    success: true,
    filePath: `local/${filePath}`,
    fileUrl: '',
    fileName: fileName
  };
}

const SUBMISSIONS_BUCKET = 'agentic-ai-submissions';

/**
 * Build the list of candidate storage folder names for a team.
 * Uploads use teamCode.toUpperCase() (e.g. TEAM01), but we also check the
 * alternate code formats (AIPS-T01) in case files were stored under those.
 */
function getFolderCandidates(teamCode) {
  const cleanCode = teamCode.trim().toUpperCase();
  const num = parseInt(cleanCode.replace(/\D/g, ''), 10);
  const candidates = [cleanCode];
  if (num) {
    candidates.push(`TEAM${String(num).padStart(2, '0')}`);
    candidates.push(`AIPS-T${String(num).padStart(2, '0')}`);
  }
  return [...new Set(candidates)];
}

/**
 * List all presentation (.ppt/.pptx) files stored for a team directly from the
 * Supabase Storage bucket, keyed by the team-code folder name. This works even
 * when the `submissions` table has no matching row.
 * Returns newest-first array of { name, path, url, size, updatedAt }.
 */
export async function listTeamPresentations(teamCode) {
  if (!supabase || !teamCode) return [];

  const results = [];
  for (const folder of getFolderCandidates(teamCode)) {
    try {
      const { data, error } = await supabase.storage
        .from(SUBMISSIONS_BUCKET)
        .list(folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (error || !data) continue;

      data.forEach(f => {
        // Skip folder placeholders (id === null) and non-presentation files
        if (!f.name || f.id === null) return;
        const ext = f.name.split('.').pop().toLowerCase();
        if (!['ppt', 'pptx'].includes(ext)) return;

        const path = `${folder}/${f.name}`;
        const { data: pub } = supabase.storage.from(SUBMISSIONS_BUCKET).getPublicUrl(path);
        results.push({
          name: f.name,
          path,
          url: pub?.publicUrl || '',
          size: f.metadata?.size ?? null,
          updatedAt: f.updated_at || f.created_at || null
        });
      });
    } catch (e) {
      // ignore per-folder listing errors
    }
  }

  results.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  return results;
}

/**
 * Helper to resolve team record from Supabase by teamCode, team_number, or alternate code formats (e.g. TEAM01 vs AIPS-T01)
 */
export async function getTeamRecord(teamCode) {
  if (!supabase || !teamCode) return null;
  const cleanCode = teamCode.trim().toUpperCase();
  const num = parseInt(cleanCode.replace(/\D/g, ''), 10);
  const altCode = num ? `AIPS-T${String(num).padStart(2, '0')}` : cleanCode;
  const altCode2 = num ? `TEAM${String(num).padStart(2, '0')}` : cleanCode;

  try {
    let query = supabase.from('teams').select('*');
    if (num) {
      query = query.or(`team_code.eq.${cleanCode},team_code.eq.${altCode},team_code.eq.${altCode2},team_number.eq.${num}`);
    } else {
      query = query.eq('team_code', cleanCode);
    }
    const { data } = await query.maybeSingle();
    return data;
  } catch (e) {
    return null;
  }
}

/**
 * Delete Project Submission for a team
 */
export async function deleteSubmission({ teamCode }) {
  const cleanCode = teamCode.toUpperCase();
  removeLocalSubmission(cleanCode);

  if (supabase) {
    try {
      const teamRec = await getTeamRecord(cleanCode);
      if (teamRec) {
        await supabase
          .from('submissions')
          .delete()
          .eq('team_id', teamRec.id);
      }
    } catch (e) {
      console.warn('Error deleting submission from Supabase:', e);
    }
  }

  return { success: true };
}

/**
 * Submit or Update Project Submission (Single active submission per team)
 */
export async function submitProject({ teamCode, githubUrl, pptFilePath, pptFileName, pptFileUrl }) {
  if (!validateGithubUrl(githubUrl)) {
    return { success: false, error: 'Please provide a valid GitHub repository URL (e.g. https://github.com/team/project).' };
  }

  const cleanCode = teamCode.toUpperCase();
  const nowStr = new Date().toISOString();

  if (supabase) {
    try {
      const teamRec = await getTeamRecord(cleanCode);

      if (teamRec) {
        const { data: existingSub } = await supabase
          .from('submissions')
          .select('id, submitted_at')
          .eq('team_id', teamRec.id)
          .maybeSingle();

        const submissionData = {
          team_id: teamRec.id,
          github_url: githubUrl.trim(),
          ppt_file_path: pptFilePath,
          ppt_file_name: pptFileName,
          status: 'submitted',
          submitted_at: existingSub ? existingSub.submitted_at : nowStr,
          updated_at: nowStr
        };

        const { data, error } = await supabase
          .from('submissions')
          .upsert([submissionData], { onConflict: 'team_id' })
          .select()
          .maybeSingle();

        if (!error && data) {
          removeLocalSubmission(cleanCode);
          return { success: true, submission: data };
        } else if (error) {
          console.warn('Supabase DB submission notice:', error.message);
        }
      }
    } catch (e) {
      console.warn('Supabase DB submission failed, writing to fallback:', e);
    }
  }

  // Fallback Local Storage
  const submissions = getLocalSubmissions();
  const existingIdx = submissions.findIndex(s => s.teamCode === cleanCode);

  const existingSub = existingIdx >= 0 ? submissions[existingIdx] : null;
  const newSub = {
    id: existingSub ? existingSub.id : 'sub-' + Date.now(),
    teamCode: cleanCode,
    githubUrl: githubUrl.trim(),
    pptFilePath,
    pptFileName,
    pptFileUrl: pptFileUrl || '',
    status: 'submitted',
    submittedAt: existingSub ? existingSub.submittedAt : nowStr,
    updatedAt: nowStr
  };

  if (existingIdx >= 0) {
    submissions[existingIdx] = newSub;
  } else {
    submissions.push(newSub);
  }

  saveLocalSubmissions(submissions);
  return { success: true, submission: newSub };
}

/**
 * Get Team Dashboard Data & Submission
 */
export async function getTeamDashboardData(eventSlug, teamCode) {
  const cleanCode = teamCode.toUpperCase();
  const seedTeam = seedData.teams.find(t => t.teamCode === cleanCode) || seedData.teams[0];

  let submission = null;

  if (supabase) {
    try {
      const teamRec = await getTeamRecord(cleanCode);

      if (teamRec) {
        const { data: subData, error: subErr } = await supabase
          .from('submissions')
          .select('*')
          .eq('team_id', teamRec.id)
          .maybeSingle();

        if (!subErr && subData && (subData.github_url || subData.ppt_file_path)) {
          let downloadUrl = '';
          if (subData.ppt_file_path && !subData.ppt_file_path.startsWith('local/')) {
            const { data: pubData } = supabase.storage
              .from('agentic-ai-submissions')
              .getPublicUrl(subData.ppt_file_path);
            downloadUrl = pubData?.publicUrl || '';
          }

          submission = {
            id: subData.id,
            teamCode: cleanCode,
            githubUrl: subData.github_url || '',
            pptFilePath: subData.ppt_file_path || '',
            pptFileName: subData.ppt_file_name || 'Project_Presentation.pptx',
            pptFileUrl: downloadUrl,
            status: subData.status || 'submitted',
            submittedAt: subData.submitted_at,
            updatedAt: subData.updated_at
          };
        } else if (!subErr && !subData) {
          // Supabase explicitly confirms no submission exists -> clear local cache
          removeLocalSubmission(cleanCode);
        }
      }
    } catch (e) {
      console.warn('Error fetching Supabase team dashboard data:', e);
    }
  }

  // Only fallback to local storage if Supabase DB failed or was unreadable
  if (!submission) {
    const num = parseInt(cleanCode.replace(/\D/g, ''), 10);
    const alt1 = num ? `AIPS-T${String(num).padStart(2, '0')}` : cleanCode;
    const alt2 = num ? `TEAM${String(num).padStart(2, '0')}` : cleanCode;
    const allSubs = getLocalSubmissions();
    const localSub = allSubs.find(s => {
      if (!s || !s.teamCode) return false;
      const sc = s.teamCode.toUpperCase();
      return sc === cleanCode || sc === alt1 || sc === alt2;
    });
    if (localSub) {
      submission = localSub;
    }
  }

  return {
    event: seedData.event,
    team: seedTeam,
    submission
  };
}

/**
 * Get Admin Overview Data for all 12 Teams
 */
export async function getAdminDashboardData() {
  const teamsList = seedData.teams;
  let dbSubmissionsMap = {};

  if (supabase) {
    try {
      const { data: teamsRecs } = await supabase.from('teams').select('id, team_code, team_number');
      const { data: subs, error: subsErr } = await supabase.from('submissions').select('*');

      if (teamsRecs && !subsErr) {
        const teamIdToCode = {};
        teamsRecs.forEach(t => {
          if (t.team_code) teamIdToCode[t.id] = t.team_code.toUpperCase();
          if (t.team_number) {
            const code = `TEAM${String(t.team_number).padStart(2, '0')}`;
            teamIdToCode[t.id] = code;
          }
        });

        (subs || []).forEach(s => {
          const code = teamIdToCode[s.team_id];
          if (code && (s.github_url || s.ppt_file_path)) {
            let downloadUrl = '';
            if (s.ppt_file_path && !s.ppt_file_path.startsWith('local/')) {
              const { data: pubData } = supabase.storage
                .from('agentic-ai-submissions')
                .getPublicUrl(s.ppt_file_path);
              downloadUrl = pubData?.publicUrl || '';
            }

            dbSubmissionsMap[code] = {
              id: s.id,
              teamCode: code,
              githubUrl: s.github_url || '',
              pptFilePath: s.ppt_file_path || '',
              pptFileName: s.ppt_file_name || 'Project_Presentation.pptx',
              pptFileUrl: downloadUrl,
              status: s.status || 'submitted',
              submittedAt: s.submitted_at,
              updatedAt: s.updated_at
            };
          }
        });

        // Clean stale local storage entries for teams that have no submission in Supabase
        teamsList.forEach(t => {
          if (!dbSubmissionsMap[t.teamCode]) {
            removeLocalSubmission(t.teamCode);
          }
        });
      }
    } catch (e) {
      console.warn('Error fetching admin data from Supabase:', e);
    }
  }

  // Merge Local Storage submissions for any remaining offline teams
  const localSubs = getLocalSubmissions();
  localSubs.forEach(ls => {
    if (!dbSubmissionsMap[ls.teamCode]) {
      dbSubmissionsMap[ls.teamCode] = ls;
    }
  });

  const teamsWithStatus = teamsList.map(t => {
    const submission = dbSubmissionsMap[t.teamCode] || null;
    return {
      teamNumber: t.teamNumber,
      teamCode: t.teamCode,
      teamName: t.teamName || '',
      mentor: t.mentor || '',
      problemStatement: t.problemStatement || '',
      members: t.members,
      isSubmitted: !!submission,
      submission,
      presentations: []
    };
  });

  // Pull presentation files directly from Storage (team-code folders), so PPTs
  // show up even when the submissions table has no row for a team.
  if (supabase) {
    await Promise.all(teamsWithStatus.map(async (t) => {
      const files = await listTeamPresentations(t.teamCode);
      t.presentations = files;
      if (files.length > 0) t.isSubmitted = true;
    }));
  }

  const totalTeams = teamsWithStatus.length;
  const submittedCount = teamsWithStatus.filter(t => t.isSubmitted).length;
  const pendingCount = totalTeams - submittedCount;

  return {
    totalTeams,
    submittedCount,
    pendingCount,
    teams: teamsWithStatus
  };
}

/**
 * Get Event Details & Data
 */
export async function getEventData(slug) {
  if (supabase) {
    try {
      const { data } = await supabase.from('events').select('*').eq('slug', slug).single();
      if (data) return data;
    } catch (e) {
      // fallback
    }
  }
  return seedData.event;
}
