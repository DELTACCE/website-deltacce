-- DELTA CCE Agentic AI Product Build Sprint Database Schema
-- Compatible with Supabase PostgreSQL & Row Level Security (RLS)

-- 1. Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    department VARCHAR(255),
    start_date DATE,
    end_date DATE,
    venue VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    team_code VARCHAR(50) UNIQUE NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    members JSONB DEFAULT '[]'::jsonb,
    mentor VARCHAR(255),
    problem_statement TEXT,
    abstract TEXT,
    auth_user_id UUID UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrations/Alterations for existing databases
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS mentor VARCHAR(255);
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS problem_statement TEXT;
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS abstract TEXT;

-- 3. Submissions table (Single submission per team)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID UNIQUE NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    github_url TEXT,
    ppt_file_path TEXT,
    ppt_file_name TEXT,
    status VARCHAR(50) DEFAULT 'submitted',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrations/Alterations for existing submissions table
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS ppt_file_path TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS ppt_file_name TEXT;
ALTER TABLE public.submissions ALTER COLUMN checkpoint_id DROP NOT NULL;

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Events RLS
DROP POLICY IF EXISTS "Public read events" ON public.events;
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);

-- Teams RLS
DROP POLICY IF EXISTS "Allow select teams for authenticated users" ON public.teams;
CREATE POLICY "Allow select teams for authenticated users" ON public.teams FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert/update teams for authenticated users" ON public.teams;
CREATE POLICY "Allow insert/update teams for authenticated users" ON public.teams FOR ALL USING (true);

-- Submissions RLS
DROP POLICY IF EXISTS "Teams manage own submission" ON public.submissions;
CREATE POLICY "Teams manage own submission" ON public.submissions FOR ALL
  USING (
    auth.uid() IN (SELECT auth_user_id FROM public.teams WHERE id = submissions.team_id)
    OR auth.jwt() ->> 'role' = 'service_role'
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    OR true -- fallback read for client queries
  );

-- Storage bucket setup for presentations
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agentic-ai-submissions', 'agentic-ai-submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public Storage Read" ON storage.objects;
CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'agentic-ai-submissions');

DROP POLICY IF EXISTS "Public Storage Insert" ON storage.objects;
CREATE POLICY "Public Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'agentic-ai-submissions');

DROP POLICY IF EXISTS "Public Storage Update" ON storage.objects;
CREATE POLICY "Public Storage Update" ON storage.objects FOR UPDATE USING (bucket_id = 'agentic-ai-submissions');

DROP POLICY IF EXISTS "Public Storage Delete" ON storage.objects;
CREATE POLICY "Public Storage Delete" ON storage.objects FOR DELETE USING (bucket_id = 'agentic-ai-submissions');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_teams_code ON public.teams(team_code);
CREATE INDEX IF NOT EXISTS idx_submissions_team ON public.submissions(team_id);
