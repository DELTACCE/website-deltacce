/**
 * Live Supabase Database Populator Script for Agentic AI Product Build Sprint
 * Automatically syncs local team & problem statement data to live Supabase database.
 * Supports both normalized relational schema (problem_statements, team_problem_statements, participants, mentors)
 * and single-table schema (teams).
 * Usage: node supabase/seed_supabase_auth.js
 */

const fs = require('fs');
const path = require('path');

// Auto-load frontend/.env file if env vars not explicitly passed
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
const seedData = require('../frontend/src/data/seedData.json');

const supabaseUrl = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('=== SUPABASE SEED SCRIPT ===');
  console.log('Error: Supabase URL or Key missing in environment or frontend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedLiveDatabase() {
  console.log('=== STARTING AUTOMATED LIVE SUPABASE DATABASE SYNC ===');
  console.log('Target Supabase URL:', supabaseUrl);

  // 1. Insert/Get Event
  let event = null;
  const { data: eventData, error: eventErr } = await supabase
    .from('events')
    .upsert([{
      name: seedData.event.name,
      slug: seedData.event.slug,
      department: seedData.event.department,
      venue: seedData.event.venue,
      start_date: seedData.event.startDate,
      end_date: seedData.event.endDate,
      status: 'active'
    }], { onConflict: 'slug' })
    .select()
    .single();

  if (eventErr) {
    console.warn('Notice when upserting event:', eventErr.message);
    const { data: existingEvent } = await supabase.from('events').select('*').eq('slug', seedData.event.slug).single();
    event = existingEvent;
  } else {
    event = eventData;
  }

  if (!event) {
    const { data: allEvents } = await supabase.from('events').select('*').limit(1);
    if (allEvents && allEvents.length > 0) event = allEvents[0];
  }

  console.log('✓ Target Event:', event ? `${event.name} (${event.id})` : 'Default Event');

  // 2. Create Admin Auth Account
  const adminEmail = 'admin@deltacce.org';
  const adminPassword = seedData.adminCredentials.password;
  if (supabase.auth && supabase.auth.admin) {
    await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: 'admin' }
    }).catch(() => {
      // Admin account already exists
    });
  }

  // 3. Process each team from seedData
  for (const t of seedData.teams) {
    const teamCode = t.teamCode;
    const teamName = t.teamName || `Team ${t.teamNumber}`;

    // Create/Find Auth User for Team
    let authUserId = null;
    const teamEmail = `${teamCode.toLowerCase()}@deltacce.org`;
    if (supabase.auth && supabase.auth.admin) {
      const { data: authUser } = await supabase.auth.admin.createUser({
        email: teamEmail,
        password: t.password,
        email_confirm: true,
        user_metadata: { role: 'team', team_code: teamCode }
      }).catch(() => ({ data: null }));
      authUserId = authUser?.user?.id || null;
    }

    // A. Seed into 'teams' table
    let teamRec = null;
    const { data: fetchTeam } = await supabase
      .from('teams')
      .select('*')
      .or(`team_code.eq.${teamCode},team_number.eq.${t.teamNumber}`)
      .maybeSingle();

    if (fetchTeam) {
      teamRec = fetchTeam;
    } else {
      const { data: newTeam } = await supabase.from('teams').insert([{
        event_id: event?.id,
        team_code: teamCode,
        team_number: t.teamNumber,
        auth_user_id: authUserId
      }]).select().single();
      teamRec = newTeam;
    }

    const teamId = teamRec?.id;
    console.log(`✓ Seeded Teams Table: ${teamCode} (${teamName})`);

    // B. Seed into 'problem_statements' and 'team_problem_statements' tables
    if (t.problemStatement) {
      try {
        let psId = null;
        const { data: existingPs } = await supabase
          .from('problem_statements')
          .select('id')
          .eq('title', teamName)
          .maybeSingle();

        if (existingPs) {
          psId = existingPs.id;
          await supabase.from('problem_statements').update({
            description: t.problemStatement
          }).eq('id', psId);
        } else {
          const { data: newPs, error: psErr } = await supabase.from('problem_statements').insert([{
            event_id: event?.id,
            title: teamName,
            description: t.problemStatement
          }]).select().single();

          if (!psErr && newPs) {
            psId = newPs.id;
          }
        }

        // Link in team_problem_statements
        if (teamId && psId) {
          const { data: existingLink } = await supabase
            .from('team_problem_statements')
            .select('id')
            .eq('team_id', teamId)
            .eq('problem_statement_id', psId)
            .maybeSingle();

          if (!existingLink) {
            await supabase.from('team_problem_statements').insert([{
              team_id: teamId,
              problem_statement_id: psId
            }]);
          }
          console.log(`  └─ Synced problem_statements & team_problem_statements for ${teamCode}`);
        }
      } catch (errPs) {
        console.warn(`  └─ Could not sync problem_statements for ${teamCode}:`, errPs.message);
      }
    }

    // C. Seed into 'participants' table
    if (teamId && t.members && Array.isArray(t.members)) {
      for (const memberName of t.members) {
        try {
          const { data: existingPart } = await supabase
            .from('participants')
            .select('id')
            .eq('team_id', teamId)
            .eq('name', memberName)
            .maybeSingle();

          if (!existingPart) {
            await supabase.from('participants').insert([{
              team_id: teamId,
              name: memberName
            }]);
          }
        } catch (errPart) {
          // Ignore if table schema differs
        }
      }
    }

    // D. Seed into 'mentors' & 'team_mentors' tables
    if (teamId && t.mentor) {
      try {
        const mentorCode = `M-${teamCode}`;
        let mentorId = null;

        const { data: existingMentor } = await supabase
          .from('mentors')
          .select('id')
          .eq('name', t.mentor)
          .maybeSingle();

        if (existingMentor) {
          mentorId = existingMentor.id;
        } else {
          const { data: newMentor, error: mErr } = await supabase.from('mentors').insert([{
            name: t.mentor,
            mentor_code: mentorCode,
            email: `mentor-${teamCode.toLowerCase()}@deltacce.org`
          }]).select().single();
          if (!mErr && newMentor) mentorId = newMentor.id;
        }

        if (mentorId) {
          const { data: existingTM } = await supabase
            .from('team_mentors')
            .select('id')
            .eq('team_id', teamId)
            .eq('mentor_id', mentorId)
            .maybeSingle();

          if (!existingTM) {
            await supabase.from('team_mentors').insert([{
              team_id: teamId,
              mentor_id: mentorId
            }]);
          }
        }
      } catch (errM) {
        // Ignore if schema differs
      }
    }
  }

  // 4. Create Storage bucket if missing
  try {
    await supabase.storage.createBucket('agentic-ai-submissions', { public: true });
    console.log('✓ Storage bucket agentic-ai-submissions created/verified');
  } catch (e) {
    // Bucket exists
  }

  console.log('=== AUTOMATED LIVE SUPABASE DATABASE SYNC COMPLETE ===');
}

if (require.main === module) {
  seedLiveDatabase();
}

module.exports = { seedLiveDatabase };
