import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCurrentSession,
  logoutUser,
  getTeamDashboardData,
  submitProject,
  uploadPresentationFile,
  validateGithubUrl
} from '../lib/supabaseClient';
import {
  LogOut,
  Users,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  Github,
  FileCode,
  Download,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function TeamDashboard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const eventSlug = slug || 'agentic-ai-product-build-sprint';

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [session, setSession] = useState(null);

  // Form State
  const [githubUrl, setGithubUrl] = useState('');
  const [pptFile, setPptFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const activeSession = getCurrentSession();
    if (!activeSession || activeSession.role !== 'team') {
      navigate(`/events/${eventSlug}/login`);
      return;
    }
    setSession(activeSession);

    async function loadData() {
      setLoading(true);
      try {
        const data = await getTeamDashboardData(eventSlug, activeSession.code);
        setDashboardData(data);
        if (data.submission) {
          setGithubUrl(data.submission.githubUrl || '');
        }
      } catch (err) {
        console.error('Error loading team dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [eventSlug, navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate(`/events/${eventSlug}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!['ppt', 'pptx'].includes(fileExt)) {
      setErrorMsg('Invalid file format. Only .ppt and .pptx files are allowed.');
      setPptFile(null);
      return;
    }

    const MAX_MB = 50;
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrorMsg(`File size exceeds limit of ${MAX_MB}MB.`);
      setPptFile(null);
      return;
    }

    setErrorMsg('');
    setPptFile(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateGithubUrl(githubUrl)) {
      setErrorMsg('Please enter a valid GitHub repository URL (e.g. https://github.com/username/repository).');
      return;
    }

    // PPT is required for initial submission; optional for update if already uploaded
    const hasExistingSubmission = dashboardData?.submission;
    if (!hasExistingSubmission && !pptFile) {
      setErrorMsg('Please select a presentation file (.ppt or .pptx) to upload.');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let pptFilePath = dashboardData?.submission?.pptFilePath || '';
      let pptFileName = dashboardData?.submission?.pptFileName || '';
      let pptFileUrl = dashboardData?.submission?.pptFileUrl || '';

      // Upload file if new file selected
      if (pptFile) {
        setUploadProgress(true);
        const uploadRes = await uploadPresentationFile(session.code, pptFile);
        setUploadProgress(false);

        if (!uploadRes.success) {
          setErrorMsg(uploadRes.error || 'Failed to upload presentation file.');
          setSubmitting(false);
          return;
        }

        pptFilePath = uploadRes.filePath;
        pptFileName = uploadRes.fileName;
        pptFileUrl = uploadRes.fileUrl;
      }

      const res = await submitProject({
        teamCode: session.code,
        githubUrl: githubUrl.trim(),
        pptFilePath,
        pptFileName,
        pptFileUrl
      });

      if (res.success) {
        setSuccessMsg(
          dashboardData?.submission
            ? 'Submission updated successfully! Your presentation is saved to the project database.'
            : 'Project submitted successfully! Your presentation is saved to the project database. Make sure to also check your team Google Drive folder below.'
        );
        setIsEditing(false);
        setPptFile(null);
        // Refresh dashboard data
        const updatedData = await getTeamDashboardData(eventSlug, session.code);
        setDashboardData(updatedData);
      } else {
        setErrorMsg(res.error || 'Failed to save project submission.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred during submission. Please try again.');
    } finally {
      setSubmitting(false);
      setUploadProgress(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="px-6 pt-31 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center font-heading text-sm text-indigo uppercase tracking-wider animate-pulse">
          Loading Team Dashboard...
        </div>
      </div>
    );
  }

  const { event, team, submission } = dashboardData;
  const isSubmitted = !!submission;

  // Deadline check (17 August 2026 23:59:59)
  const deadlineDate = new Date(event.submissionDeadline || '2026-08-17T23:59:59+05:30');
  const isPastDeadline = Date.now() > deadlineDate.getTime();

  return (
    <div className="px-6 pt-31 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="relative border border-indigo/15 bg-paper/75 backdrop-blur-md backdrop-saturate-150 shadow-md rounded-[2rem] p-8 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase">
                  {"// PARTICIPANT PORTAL"}
                </span>
                <span className="font-heading text-xs font-bold text-signal bg-signal/10 border border-signal/20 px-3 py-1 rounded-full uppercase">
                  {team.teamCode}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-indigo uppercase tracking-wide">
                Welcome, {team.teamName ? team.teamName : `Team ${team.teamNumber < 10 ? `0${team.teamNumber}` : team.teamNumber}`}
              </h1>
              <p className="font-body text-xs text-ink/70 mt-1">
                {team.teamCode} • Mentor: <span className="font-semibold text-indigo">{team.mentor || 'Assigned'}</span> • {event.name}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-indigo/20 bg-paper hover:bg-red-500/10 hover:border-red-500/30 text-ink hover:text-red-600 px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 w-max"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Status Bar & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Submission Status */}
          <div className={`border rounded-3xl p-6 flex flex-col justify-between ${
            isSubmitted ? 'border-teal/30 bg-teal/5' : 'border-amber-500/30 bg-amber-500/5'
          }`}>
            <div>
              <span className="font-heading text-[10px] uppercase font-bold tracking-[0.2em] text-ink/60 block mb-2">
                Submission Status
              </span>
              {isSubmitted ? (
                <div className="flex items-center gap-2 text-teal font-heading text-lg font-extrabold uppercase">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  SUBMITTED
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 font-heading text-lg font-extrabold uppercase">
                  <Clock className="w-6 h-6 shrink-0 animate-pulse" />
                  NOT SUBMITTED
                </div>
              )}
            </div>
            <p className="font-body text-xs text-ink/75 mt-3">
              {isSubmitted
                ? `Submitted on ${new Date(submission.submittedAt).toLocaleString()}`
                : 'Action required before deadline.'}
            </p>
          </div>

          {/* Team Info & Members */}
          <div className="border border-indigo/10 rounded-3xl p-6 bg-paper/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-teal font-heading text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                <Users className="w-4 h-4" />
                Team Members ({team.members.length})
              </div>
              <ul className="space-y-1.5">
                {team.members.map((member, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-body text-xs font-semibold text-indigo">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
            {team.mentor && (
              <p className="font-body text-[11px] text-ink/60 mt-3 pt-2 border-t border-indigo/10">
                Mentor: <span className="font-semibold text-indigo">{team.mentor}</span>
              </p>
            )}
          </div>

          {/* Deadline Info */}
          <div className="border border-indigo/10 rounded-3xl p-6 bg-indigo/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-signal font-heading text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                <Clock className="w-4 h-4" />
                Final Submission Deadline
              </div>
              <p className="font-heading text-base font-extrabold text-indigo uppercase">
                17 August 2026
              </p>
              <p className="font-body text-xs text-ink/70 mt-1">
                {isPastDeadline ? 'Deadline Passed' : 'Virtual Product Build Sprint Deadline'}
              </p>
            </div>
          </div>

        </div>

        {/* REGISTERED PROJECT SPECIFICATION CARD */}
        {(team.problemStatement || team.abstract) && (
          <div className="border border-indigo/15 bg-paper/80 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-indigo/10 pb-4">
              <div>
                <span className="font-heading text-[10px] uppercase font-bold tracking-[0.2em] text-teal block mb-1">
                  {"// REGISTERED SPECIFICATION"}
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-indigo uppercase">
                  {team.teamName} — Project Brief
                </h2>
              </div>
              {team.mentor && (
                <span className="hidden sm:inline-flex items-center gap-1.5 border border-indigo/15 bg-indigo/5 text-indigo px-3 py-1.5 rounded-xl font-heading text-xs font-bold">
                  Mentor: {team.mentor}
                </span>
              )}
            </div>

            {team.problemStatement && (
              <div>
                <h3 className="font-heading text-xs font-bold text-signal uppercase tracking-wider mb-1.5">
                  Problem Statement
                </h3>
                <p className="font-body text-xs md:text-sm text-ink/80 leading-relaxed bg-white/50 p-4 rounded-xl border border-indigo/10">
                  {team.problemStatement}
                </p>
              </div>
            )}

            {team.abstract && (
              <div>
                <h3 className="font-heading text-xs font-bold text-teal uppercase tracking-wider mb-1.5">
                  Project Abstract
                </h3>
                <p className="font-body text-xs md:text-sm text-ink/80 leading-relaxed bg-white/50 p-4 rounded-xl border border-indigo/10">
                  {team.abstract}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {successMsg && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-teal-500/30 bg-teal-500/10 text-teal-900 px-6 py-4 rounded-2xl text-sm font-body font-semibold">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
              <span>{successMsg}</span>
            </div>
            <a
              href="https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-teal text-white hover:bg-teal/90 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open Google Drive Folder
            </a>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-3 border border-red-500/30 bg-red-500/10 text-red-700 px-5 py-4 rounded-2xl text-sm font-body font-medium">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ACTIVE SUBMISSION VIEW (If already submitted and not currently editing) */}
        {isSubmitted && !isEditing && (
          <div className="border border-teal/25 bg-paper/80 backdrop-blur-md rounded-[2rem] p-8 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo/10 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 border border-teal/30 bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-heading font-bold uppercase mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Project Submitted Successfully
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-indigo uppercase">
                  Active Submission Details
                </h2>
              </div>
              {!isPastDeadline && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 border border-signal/30 bg-signal/10 hover:bg-signal text-signal hover:text-white font-heading text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 shrink-0"
                >
                  <RefreshCw className="w-4 h-4" />
                  Update Submission
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* GitHub Repo Card */}
              <div className="border border-indigo/10 rounded-2xl p-6 bg-paper shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo font-heading text-xs font-bold uppercase">
                  <Github className="w-4 h-4 text-signal" />
                  GitHub Repository
                </div>
                <p className="font-mono text-sm text-indigo break-all font-semibold">
                  {submission.githubUrl}
                </p>
                <a
                  href={submission.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-signal hover:underline font-heading text-xs font-bold uppercase tracking-wider pt-2"
                >
                  View Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* PPT File Card */}
              <div className="border border-indigo/10 rounded-2xl p-6 bg-paper shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo font-heading text-xs font-bold uppercase">
                  <FileCode className="w-4 h-4 text-teal" />
                  Project Presentation
                </div>
                <p className="font-body text-sm font-semibold text-indigo">
                  {submission.pptFileName || 'Project_Presentation.pptx'}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {submission.pptFileUrl && (
                    <a
                      href={submission.pptFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center gap-2 border border-teal/30 bg-teal/10 hover:bg-teal text-teal hover:text-white font-heading text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PPT
                    </a>
                  )}
                  <a
                    href="https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-indigo/20 bg-indigo/5 hover:bg-indigo hover:text-white text-indigo font-heading text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Drive Submissions Folder
                  </a>
                </div>
              </div>

            </div>

            {/* Timestamps */}
            <div className="border-t border-indigo/10 pt-4 flex flex-wrap items-center justify-between text-xs font-body text-ink/60 gap-2">
              <span>Submitted At: <strong>{new Date(submission.submittedAt).toLocaleString()}</strong></span>
              {submission.updatedAt && (
                <span>Last Updated: <strong>{new Date(submission.updatedAt).toLocaleString()}</strong></span>
              )}
            </div>
          </div>
        )}

        {/* SUBMISSION FORM (Displayed if not submitted, or if editing) */}
        {(!isSubmitted || isEditing) && (
          <div className="border border-indigo/15 bg-paper/75 backdrop-blur-md rounded-[2rem] p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-indigo/10 pb-4">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-signal" />
                <h2 className="font-heading text-xl font-extrabold text-indigo uppercase tracking-wide">
                  {isSubmitted ? 'Update Project Submission' : 'Submit Final Project'}
                </h2>
              </div>
              {isSubmitted && isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="font-heading text-xs uppercase font-bold text-ink/60 hover:text-indigo"
                >
                  Cancel
                </button>
              )}
            </div>

            {isPastDeadline ? (
              <div className="border border-red-500/20 bg-red-500/10 p-6 rounded-2xl text-center space-y-2">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
                <h3 className="font-heading text-base font-extrabold text-red-700 uppercase">
                  Submission Portal Closed
                </h3>
                <p className="font-body text-xs text-red-700/80">
                  The deadline for final project submission was 17 August 2026. Submissions are no longer being accepted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* GitHub Repo Field */}
                <div>
                  <label className="block font-heading text-xs font-bold text-indigo uppercase tracking-wider mb-2">
                    GitHub Repository URL *
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 absolute left-3.5 top-3.5 text-ink/40" />
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/your-team/your-project"
                      className="w-full bg-paper border border-indigo/20 focus:border-signal focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm font-body text-ink placeholder:text-ink/40"
                      required
                    />
                  </div>
                  <p className="font-body text-[11px] text-ink/60 mt-1">
                    Enter the public GitHub repository URL containing your team's code.
                  </p>
                </div>

                {/* PPT Upload Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-heading text-xs font-bold text-indigo uppercase tracking-wider">
                      Upload Project Presentation (.ppt / .pptx) {isSubmitted ? '(Optional to replace existing)' : '*'}
                    </label>
                    <a
                      href="https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-teal hover:text-indigo text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Google Drive Submissions Folder
                    </a>
                  </div>
                  <div className="border-2 border-dashed border-indigo/20 rounded-2xl p-6 text-center hover:border-signal/40 transition-colors bg-paper/40 space-y-3">
                    <FileCode className="w-8 h-8 text-teal mx-auto" />
                    <input
                      type="file"
                      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      onChange={handleFileChange}
                      className="hidden"
                      id="ppt-upload"
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <label
                        htmlFor="ppt-upload"
                        className="cursor-pointer inline-flex items-center gap-2 bg-indigo/10 hover:bg-indigo/20 text-indigo font-heading text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-signal" />
                        {pptFile ? 'Change Selected File' : 'Select PPT / PPTX File'}
                      </label>
                      <a
                        href="https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-teal/10 hover:bg-teal/20 text-teal font-heading text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Team Drive Folder ({team.teamCode})
                      </a>
                    </div>
                    <p className="font-body text-xs text-ink/70 font-semibold">
                      {pptFile ? pptFile.name : (submission?.pptFileName ? `Current file: ${submission.pptFileName}` : 'Allowed formats: .ppt, .pptx (Max 50MB)')}
                    </p>
                    <p className="font-body text-[11px] text-ink/60">
                      Uploaded presentation files are stored in Supabase Storage and associated with your team's Google Drive folder (<code className="text-indigo font-bold">{team.teamCode}</code>).
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || uploadProgress}
                    className="w-full sm:w-auto bg-gradient-to-r from-signal to-teal text-white font-heading text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:opacity-95 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting || uploadProgress ? 'Uploading & Submitting...' : (isSubmitted ? 'Update Submission' : 'Submit Project')}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper border border-indigo/20 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-signal">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-heading text-lg font-extrabold text-indigo uppercase">
                Confirm Project Submission
              </h3>
            </div>
            <p className="font-body text-sm text-ink/80 leading-relaxed">
              Are you sure you want to submit the following project for <strong className="text-indigo">{team.teamCode}</strong>?
            </p>
            <div className="bg-indigo/5 p-4 rounded-xl space-y-2 font-body text-xs text-ink/80">
              <p><strong>GitHub URL:</strong> {githubUrl}</p>
              <p><strong>Presentation File:</strong> {pptFile ? pptFile.name : (submission?.pptFileName || 'Selected presentation')}</p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl border border-indigo/20 font-heading text-xs uppercase font-bold text-ink/70 hover:bg-indigo/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-6 py-2.5 rounded-xl bg-signal text-white font-heading text-xs uppercase font-bold hover:opacity-95"
              >
                Yes, Submit Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
