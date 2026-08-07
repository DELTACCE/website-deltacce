import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  CalendarDays,
  Ellipsis,
  Home,
  Info,
  Mail,
  Users,
} from 'lucide-react';

// ─── Route config ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { name: 'Home',      path: '/',          icon: Home },
  { name: 'Events',   path: '/events',     icon: CalendarDays },
  { name: 'About',    path: '/about',      icon: Info },
  { name: 'Committee',path: '/committee',  icon: Users },
];

const MORE_ITEMS = [
  { name: 'Brand',   path: '/brand',   icon: BookOpen },
  { name: 'Contact', path: '/contact', icon: Mail },
];

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  active:   '#FF5500',
  inactive: '#1E293B',
  border:   'rgba(255,255,255,0.40)',
};

const MOTION = {
  item:     { type: 'spring', stiffness: 420, damping: 34 },
  dropdown: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** True when pathname belongs to a given route prefix */
function pathMatches(pathname, path) {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function getActiveMainPath(pathname) {
  const found = NAV_ITEMS.find((item) => pathMatches(pathname, item.path));
  return found ? found.path : null;
}

function getActiveMorePath(pathname) {
  const found = MORE_ITEMS.find((item) => pathname === item.path);
  return found ? found.path : null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Active glow that sits behind the icon pill.
 * Renders as a blurred orange blob when active.
 */
function IconGlow({ active }) {
  return (
    <span
      aria-hidden
      className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300 pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(255,85,0,0.32), rgba(255,85,0,0))',
        opacity: active ? 1 : 0,
      }}
    />
  );
}

/**
 * Pill-shaped icon container. Shows a frosted-glass bubble when active.
 */
function IconPill({ active, children }) {
  return (
    <span
      className="relative flex items-center justify-center transition-all duration-300"
      style={{
        width:  'clamp(38px, 5.8vw, 48px)',
        height: 'clamp(38px, 5.8vw, 48px)',
        borderRadius: 'clamp(17px, 2.4vw, 22px)',
        border: active ? '1px solid rgba(255,255,255,0.55)' : '1px solid transparent',
        background: active
          ? 'linear-gradient(180deg, rgba(255,255,255,0.58), rgba(255,255,255,0.28))'
          : 'transparent',
        boxShadow: active
          ? 'inset 0 1px 0 rgba(255,255,255,0.78), 0 10px 24px -12px rgba(255,85,0,0.20)'
          : 'none',
        backdropFilter: active ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: active ? 'blur(12px)' : 'none',
        color: active ? C.active : C.inactive,
      }}
    >
      <IconGlow active={active} />
      {children}
    </span>
  );
}

/** A single nav cell (icon + label). */
function NavCell({ icon: Icon, label, active, children }) {
  return (
    <span
      className="flex h-full w-full flex-col items-center justify-center text-center"
      style={{
        gap: 'clamp(4px, 0.7vw, 7px)',
        borderRadius: 'clamp(18px, 2.6vw, 24px)',
        padding: 'clamp(5px, 0.8vw, 8px) 4px',
      }}
    >
      <IconPill active={active}>
        <Icon
          strokeWidth={2.1}
          style={{
            width:  'clamp(22px, 3.6vw, 28px)',
            height: 'clamp(22px, 3.6vw, 28px)',
            flexShrink: 0,
          }}
        />
      </IconPill>
      <span
        style={{
          fontSize: 'clamp(10px, 1.5vw, 12px)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: active ? C.active : C.inactive,
        }}
      >
        {label}
      </span>
      {children}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BottomGlassNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const moreButtonRef = useRef(null);

  const activeMainPath = useMemo(() => getActiveMainPath(pathname), [pathname]);
  const activeMorePath = useMemo(() => getActiveMorePath(pathname), [pathname]);
  const moreIsActive   = activeMorePath !== null;

  // Close dropdown on route change
  useEffect(() => { setDropdownOpen(false); }, [pathname]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setDropdownOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dropdownOpen]);

  const toggleDropdown = useCallback(() => setDropdownOpen((v) => !v), []);
  const closeDropdown  = useCallback(() => setDropdownOpen(false), []);

  const handleMoreItemClick = useCallback((path) => {
    closeDropdown();
    navigate(path);
  }, [closeDropdown, navigate]);

  return (
    <>
      {/* ── Click-away backdrop (rendered at root level, below navbar) ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-[48]"
            aria-hidden
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>

      {/* ── Navbar shell ── */}
      <div
        className="fixed inset-x-0 bottom-0 z-[49] flex justify-center pointer-events-none"
        style={{
          padding: `0 clamp(8px, 2vw, 16px) calc(env(safe-area-inset-bottom) + clamp(8px, 1.6vw, 14px))`,
        }}
      >
        <nav
          aria-label="Bottom navigation"
          className="relative pointer-events-auto"
          style={{
            width: 'clamp(280px, 90vw, 420px)',
            borderRadius: 'clamp(28px, 4vw, 34px)',
            padding: 'clamp(8px, 1.25vw, 12px) clamp(8px, 1.5vw, 14px)',
            /* Glass surface — single clean layer, no extra overlay divs */
            background: 'linear-gradient(180deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.22) 100%)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            border: `1px solid ${C.border}`,
            boxShadow:
              '0 24px 58px -28px rgba(15,23,42,0.42), 0 10px 26px -18px rgba(255,85,0,0.14), inset 0 1px 0 rgba(255,255,255,0.82)',
          }}
        >
          {/* Top highlight line — one single subtle shimmer */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.90), transparent)',
              borderRadius: '50%',
            }}
          />

          {/* ── 5-column grid ── */}
          <div
            className="relative grid items-stretch"
            style={{
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 'clamp(1px, 0.55vw, 6px)',
            }}
          >
            {/* Main nav items */}
            {NAV_ITEMS.map((item) => {
              const isActive = activeMainPath === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className="block min-w-0"
                >
                  <motion.div
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.975 }}
                    transition={MOTION.item}
                    className="h-full w-full"
                  >
                    <NavCell icon={item.icon} label={item.name} active={isActive} />
                  </motion.div>
                </NavLink>
              );
            })}

            {/* More button + dropdown */}
            <div className="relative min-w-0" ref={moreButtonRef}>
              <button
                type="button"
                id="more-menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                aria-controls="more-menu"
                onClick={toggleDropdown}
                className="block h-full w-full min-w-0 focus:outline-none"
              >
                <motion.div
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.975 }}
                  transition={MOTION.item}
                  className="h-full w-full"
                >
                  <NavCell icon={Ellipsis} label="More" active={moreIsActive || dropdownOpen} />
                </motion.div>
              </button>

              {/* Dropdown — positioned ABOVE the navbar, outside overflow */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    id="more-menu"
                    role="menu"
                    aria-labelledby="more-menu-button"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={MOTION.dropdown}
                    className="absolute right-0 z-[50]"
                    style={{
                      bottom: 'calc(100% + clamp(8px, 1.6vw, 14px))',
                      minWidth: 'clamp(140px, 30vw, 176px)',
                      borderRadius: '1.45rem',
                      border: '1px solid rgba(255,255,255,0.45)',
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.48) 100%)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                      boxShadow:
                        '0 26px 56px -24px rgba(15,23,42,0.46), inset 0 1px 0 rgba(255,255,255,0.86)',
                    }}
                  >
                    <div
                      className="relative p-2 flex flex-col gap-1"
                      role="none"
                    >
                      {MORE_ITEMS.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = activeMorePath === item.path;

                        return (
                          <button
                            key={item.path}
                            type="button"
                            role="menuitem"
                            onClick={() => handleMoreItemClick(item.path)}
                            className="flex w-full items-center gap-2.5 rounded-[1.1rem] px-4 py-2.5 text-left text-sm tracking-tight transition-colors duration-200 focus:outline-none"
                            style={{
                              color: isActive ? C.active : C.inactive,
                              background: isActive
                                ? 'rgba(255,255,255,0.60)'
                                : 'transparent',
                              boxShadow: isActive
                                ? 'inset 0 1px 0 rgba(255,255,255,0.78)'
                                : 'none',
                              fontWeight: isActive ? 600 : 400,
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.38)';
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <ItemIcon
                              strokeWidth={2.1}
                              style={{
                                width: '16px',
                                height: '16px',
                                flexShrink: 0,
                                color: isActive ? C.active : C.inactive,
                              }}
                            />
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
