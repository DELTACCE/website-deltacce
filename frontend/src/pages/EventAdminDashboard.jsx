import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentSession, logoutUser, getAdminDashboardData } from '../lib/supabaseClient';
import {
  LogOut,
  Users,
  CheckCircle2,
  Clock,
  Github,
  FileCode,
  Download,
  ExternalLink,
  Search,
  RefreshCw,
  Filter,
  FolderGit2
} from 'lucide-react';

export default function EventAdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'submitted', 'pending'

  useEffect(() => {
    const activeSession = getCurrentSession();
    if (!activeSession || activeSession.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getAdminDashboardData();
      setAdminData(data);
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/admin/login');
  };

  if (loading || !adminData) {
    return (
      <div className="px-6 pt-31 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center font-heading text-sm text-indigo uppercase tracking-wider animate-pulse flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-signal" />
          Loading Administrative Control Panel...
        </div>
      </div>
    );
  }

  const { totalTeams, submittedCount, pendingCount, teams } = adminData;

  // Filter teams based on search & status filter
  const filteredTeams = teams.filter(t => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      t.teamCode.toLowerCase().includes(searchLower) ||
      (t.teamName && t.teamName.toLowerCase().includes(searchLower)) ||
      (t.mentor && t.mentor.toLowerCase().includes(searchLower)) ||
      (t.problemStatement && t.problemStatement.toLowerCase().includes(searchLower)) ||
      t.members.some(m => m.toLowerCase().includes(searchLower));

    if (!matchesSearch) return false;

    if (filterStatus === 'submitted') return t.isSubmitted;
    if (filterStatus === 'pending') return !t.isSubmitted;
    return true;
  });

  return (
    <div className="px-6 pt-31 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="relative border border-indigo/15 bg-paper/75 backdrop-blur-md shadow-md rounded-[2rem] p-8 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase">
                  {"// ADMINISTRATIVE CONTROL PORTAL"}
                </span>
                <span className="font-heading text-[10px] bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded-full font-bold">
                  LIVE DATABASE
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-indigo uppercase tracking-wide">
                Agentic AI Sprint Management
              </h1>
              <p className="font-body text-xs text-ink/70 mt-1">
                Participant Submissions & Google Drive Repository Monitor
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Google Drive Submissions Master Link */}
              <a
                href={adminData.event?.driveFolderUrl || 'https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-teal/30 bg-teal/10 hover:bg-teal text-teal hover:text-white px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <FolderGit2 className="w-4 h-4" />
                Google Drive Submissions
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 border border-indigo/20 bg-paper hover:bg-red-500/10 hover:border-red-500/30 text-ink hover:text-red-600 px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 w-max"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="border border-indigo/15 rounded-3xl p-6 bg-paper/70 flex items-center justify-between">
            <div>
              <span className="font-heading text-[10px] uppercase font-bold tracking-[0.2em] text-ink/60 block mb-1">
                Total Teams
              </span>
              <span className="font-heading text-3xl font-extrabold text-indigo">
                {totalTeams}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo/10 flex items-center justify-center text-indigo">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="border border-teal/20 rounded-3xl p-6 bg-teal/5 flex items-center justify-between">
            <div>
              <span className="font-heading text-[10px] uppercase font-bold tracking-[0.2em] text-teal block mb-1">
                Submitted
              </span>
              <span className="font-heading text-3xl font-extrabold text-teal">
                {submittedCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal/15 flex items-center justify-center text-teal">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="border border-amber-500/20 rounded-3xl p-6 bg-amber-500/5 flex items-center justify-between">
            <div>
              <span className="font-heading text-[10px] uppercase font-bold tracking-[0.2em] text-amber-700 block mb-1">
                Pending Submissions
              </span>
              <span className="font-heading text-3xl font-extrabold text-amber-600">
                {pendingCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Submissions Section */}
        <div className="border border-indigo/15 bg-paper/80 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo/10 pb-6">
            <h2 className="font-heading text-lg font-extrabold text-indigo uppercase tracking-wide">
              Team Submissions ({filteredTeams.length})
            </h2>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Search Bar */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-ink/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search team, name, mentor, project..."
                  className="w-full bg-paper border border-indigo/20 focus:border-signal focus:outline-none rounded-xl pl-10 pr-4 py-2 text-xs font-body text-ink placeholder:text-ink/40"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-2 border border-indigo/20 bg-paper rounded-xl px-3 py-1.5 text-xs font-body text-ink shrink-0">
                <Filter className="w-3.5 h-3.5 text-teal" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent focus:outline-none font-heading text-xs uppercase font-bold text-indigo"
                >
                  <option value="all">All Status ({totalTeams})</option>
                  <option value="submitted">Submitted ({submittedCount})</option>
                  <option value="pending">Pending ({pendingCount})</option>
                </select>
              </div>

            </div>
          </div>

          {/* Teams Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="border-b border-indigo/10 font-heading text-[10px] uppercase text-teal tracking-wider">
                  <th className="py-3 px-4">Team & Project</th>
                  <th className="py-3 px-4">Mentor</th>
                  <th className="py-3 px-4">Team Members</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">GitHub Repository</th>
                  <th className="py-3 px-4">Presentation PPT</th>
                  <th className="py-3 px-4">Google Drive Folder</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-ink/60 font-body text-xs">
                      No matching teams found.
                    </td>
                  </tr>
                ) : (
                  filteredTeams.map((t) => {
                    const sub = t.submission;
                    return (
                      <tr key={t.teamCode} className="border-b border-indigo/10 last:border-b-0 hover:bg-indigo/5 transition-colors">
                        <td className="py-4 px-4 font-heading font-bold text-indigo">
                          {t.teamName && t.teamName !== `Team ${t.teamNumber}` && (
                            <span className="block font-bold text-signal text-xs">{t.teamName}</span>
                          )}
                          <span className="block text-indigo font-extrabold">{t.teamCode}</span>
                          <span className="text-[10px] text-ink/60 font-normal">Team {t.teamNumber}</span>
                        </td>
                        <td className="py-4 px-4 font-heading text-xs text-indigo">
                          {t.mentor || <span className="text-ink/40">—</span>}
                        </td>
                        <td className="py-4 px-4 text-ink/80 max-w-xs">
                          {t.members.join(', ')}
                        </td>
                        <td className="py-4 px-4">
                          {t.isSubmitted ? (
                            <span className="inline-flex items-center gap-1 text-teal font-heading text-[10px] uppercase font-bold bg-teal/10 border border-teal/20 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Submitted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-heading text-[10px] uppercase font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {sub && sub.githubUrl ? (
                            <a
                              href={sub.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-signal hover:underline font-mono text-xs font-semibold"
                            >
                              <Github className="w-3.5 h-3.5 shrink-0" />
                              View GitHub <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-ink/40">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {t.presentations && t.presentations.length > 0 ? (
                            <div className="flex flex-col gap-2">
                              {t.presentations.map((p) => (
                                <div key={p.path} className="flex items-center gap-2">
                                  <a
                                    href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(p.url)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={`View ${p.name}`}
                                    className="inline-flex items-center gap-1.5 border border-teal/30 bg-teal/10 hover:bg-teal text-teal hover:text-white font-heading text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    <FileCode className="w-3 h-3" /> View
                                  </a>
                                  <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                    title={`Download ${p.name}`}
                                    className="inline-flex items-center gap-1 text-signal hover:underline font-heading text-[10px] font-bold uppercase tracking-wider"
                                  >
                                    <Download className="w-3 h-3" /> Download
                                  </a>
                                </div>
                              ))}
                              {t.presentations.length > 1 && (
                                <span className="text-[9px] text-ink/50 font-body">
                                  {t.presentations.length} files in folder
                                </span>
                              )}
                            </div>
                          ) : sub && (sub.pptFileUrl || sub.pptFileName) ? (
                            sub.pptFileUrl ? (
                              <a
                                href={sub.pptFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="inline-flex items-center gap-1.5 border border-teal/30 bg-teal/10 hover:bg-teal text-teal hover:text-white font-heading text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
                              >
                                <Download className="w-3 h-3" /> View / Download
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-indigo font-body text-xs">
                                <FileCode className="w-3.5 h-3.5 text-teal" /> {sub.pptFileName}
                              </span>
                            )
                          ) : (
                            <span className="text-ink/40">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href="https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-teal hover:underline font-heading text-[11px] font-bold uppercase tracking-wider"
                          >
                            <ExternalLink className="w-3 h-3" /> Open {t.teamCode} Drive
                          </a>
                        </td>
                        <td className="py-4 px-4 text-ink/70 font-mono text-[11px]">
                          {sub && sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '—'}
                        </td>
                        <td className="py-4 px-4 text-ink/70 font-mono text-[11px]">
                          {sub && sub.updatedAt ? new Date(sub.updatedAt).toLocaleString() : '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
