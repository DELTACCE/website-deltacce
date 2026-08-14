import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser, getCurrentSession } from '../lib/supabaseClient';
import { ArrowLeft, Lock, Users, ShieldCheck, AlertCircle } from 'lucide-react';
import seedData from '../data/seedData.json';

export default function EventLogin({ defaultRole }) {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const eventSlug = slug || 'agentic-ai-product-build-sprint';
  const isDirectAdminRoute = location.pathname.startsWith('/admin');
  
  const [role, setRole] = useState(defaultRole || (isDirectAdminRoute ? 'admin' : 'team'));
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const eventTitle = seedData.event.name;

  // Check if already logged in
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      if (session.role === 'team') navigate(`/events/${eventSlug}/dashboard`);
      else if (session.role === 'admin') navigate(`/admin`);
    }
  }, [eventSlug, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!code || !password) {
      setError('Please enter both ID and Password.');
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser({ eventSlug, code, password, role });
      if (res.success) {
        if (role === 'team') {
          navigate(`/events/${eventSlug}/dashboard`);
        } else if (role === 'admin') {
          navigate('/admin');
        }
      } else {
        setError(res.error || 'Invalid ID or Password.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pt-31 pb-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        
        {/* Back Link */}
        <Link
          to={`/events/${eventSlug}`}
          className="inline-flex items-center gap-2 text-signal font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 hover:translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event Overview
        </Link>

        {/* Main Card */}
        <div className="relative border border-indigo/15 bg-paper/75 backdrop-blur-md backdrop-saturate-150 shadow-[0_16px_40px_-8px_rgba(14,48,97,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[2rem] p-8 md:p-10 overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-heading text-[10px] text-teal font-bold tracking-[0.25em] uppercase block mb-2">
              {"// SECURE PORTAL"}
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-indigo uppercase leading-tight tracking-tight mb-2">
              {eventTitle}
            </h1>
            <p className="font-body text-xs text-ink/70">
              {role === 'team'
                ? 'Team Login to submit your final project GitHub repository and presentation.'
                : 'Administrative login for submission review and oversight.'}
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-indigo/5 p-1.5 rounded-2xl mb-8 border border-indigo/10">
            <button
              type="button"
              onClick={() => { setRole('team'); setError(''); setCode(''); setPassword(''); }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                role === 'team'
                  ? 'bg-paper text-indigo shadow-sm border border-indigo/15'
                  : 'text-ink/60 hover:text-indigo'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-signal" />
              Team Login
            </button>

            <button
              type="button"
              onClick={() => { setRole('admin'); setError(''); setCode(''); setPassword(''); }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                role === 'admin'
                  ? 'bg-paper text-indigo shadow-sm border border-indigo/15'
                  : 'text-ink/60 hover:text-indigo'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal" />
              Admin Login
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 text-red-700 px-4 py-3 rounded-xl text-xs font-body font-medium mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-heading text-[11px] font-bold text-indigo uppercase tracking-wider mb-2">
                {role === 'team' ? 'Team ID' : 'Admin Username'}
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={role === 'team' ? 'e.g. TEAM01' : 'Admin ID'}
                className="w-full bg-paper border border-indigo/20 focus:border-signal focus:outline-none rounded-xl px-4 py-3 text-sm font-body text-ink placeholder:text-ink/40 transition-colors uppercase tracking-wider"
                required
              />
            </div>

            <div>
              <label className="block font-heading text-[11px] font-bold text-indigo uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-paper border border-indigo/20 focus:border-signal focus:outline-none rounded-xl px-4 py-3 text-sm font-body text-ink placeholder:text-ink/40 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo hover:bg-indigo/90 text-white font-heading text-xs font-bold uppercase tracking-[0.2em] py-3.5 rounded-xl shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {role === 'team' ? 'Login' : 'Sign In as Admin'}
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
