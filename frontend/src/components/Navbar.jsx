import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Ellipsis,
  Home,
  Info,
  Mail,
  Menu,
  Users,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Events', path: '/events', icon: CalendarDays },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Committee', path: '/committee', icon: Users },
];

const MORE_ITEMS = [
  { name: 'Brand', path: '/brand', icon: BookOpen },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const COLORS = {
  active: '#FF5500',
  brand: '#0E3061',
  inactive: '#1E293B',
  border: 'rgba(255,255,255,0.40)',
};

const MOTION = {
  item: { type: 'spring', stiffness: 420, damping: 34 },
  panel: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
};

function pathMatches(pathname, path) {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function getActiveMainPath(pathname) {
  const match = NAV_ITEMS.find((item) => pathMatches(pathname, item.path));
  return match ? match.path : null;
}

function getActiveMorePath(pathname) {
  const match = MORE_ITEMS.find((item) => pathname === item.path);
  return match ? match.path : null;
}

function Surface({ children, className = '', style = {}, role, id, labelledBy }) {
  return (
    <div
      role={role}
      id={id}
      aria-labelledby={labelledBy}
      className={`overflow-hidden rounded-[1.75rem] border ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.66))',
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        borderColor: COLORS.border,
        boxShadow: '0 16px 36px -24px rgba(15,23,42,0.28), 0 8px 18px -14px rgba(255,85,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BrandLink() {
  const [hovered, setHovered] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  return (
    <NavLink
      to="/"
      end
      aria-label="DELTA home"
      onClick={() => {
        setSpinCount((value) => value + 1);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex shrink-0 items-center gap-2 select-none font-heading font-bold text-2xl leading-none transition-opacity duration-200 hover:opacity-90"
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      }}
    >
      <span
        className="inline-flex origin-center text-3xl font-extrabold leading-none"
        style={{
          color: COLORS.active,
          transform: `rotate(${spinCount * 360 + (hovered ? 180 : 0)}deg)`,
          transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {"\u03B4"}
      </span>
      <span style={{ color: COLORS.brand }}>DELTA</span>
    </NavLink>
  );
}

function DesktopNavItem({ item, active }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium tracking-tighter transition-all duration-200 hover:bg-white/55"
      style={{
        color: active ? COLORS.active : COLORS.inactive,
        borderColor: active ? 'rgba(255,85,0,0.22)' : 'transparent',
        background: active ? 'rgba(255,255,255,0.75)' : 'transparent',
      }}
    >
      <Icon strokeWidth={2.1} className="h-[0.95rem] w-[0.95rem] shrink-0" />
      <span>{item.name}</span>
    </NavLink>
  );
}

function MoreButton({ open, active, onToggle }) {
  return (
    <button
      id="more-menu-button"
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium tracking-tighter transition-all duration-200 hover:bg-white/55"
      style={{
        color: active ? COLORS.active : COLORS.inactive,
        borderColor: active ? 'rgba(255,85,0,0.22)' : 'transparent',
        background: open ? 'rgba(255,255,255,0.75)' : 'transparent',
      }}
    >
      <Ellipsis className="h-[0.95rem] w-[0.95rem]" strokeWidth={2.1} />
      <span>More</span>
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
    </button>
  );
}

function MobileMenuPanel({ open, pathname, onNavigate, onClose }) {
  const activeMainPath = useMemo(() => getActiveMainPath(pathname), [pathname]);
  const activeMorePath = useMemo(() => getActiveMorePath(pathname), [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 z-40 bg-paper/25 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.985 }}
            transition={MOTION.panel}
            className="absolute left-0 right-0 top-full z-50 px-4 pb-4 pt-2 md:hidden"
          >
            <Surface className="mx-auto w-[min(100%,40rem)]">
              <div className="border-b border-indigo/10 px-4 py-3">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-teal">
                  Navigation
                </p>
                <p className="mt-1 text-sm text-ink/70">
                  Browse the site
                </p>
              </div>

              <div className="grid gap-1 p-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200"
                    style={{
                      color: activeMainPath === item.path ? COLORS.active : COLORS.inactive,
                      background: activeMainPath === item.path ? 'rgba(255,255,255,0.78)' : 'transparent',
                    }}
                  >
                    <item.icon strokeWidth={2.1} className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-indigo/10 px-3 pb-3 pt-2">
                <div className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-teal">
                  More
                </div>
                <div className="grid gap-1">
                  {MORE_ITEMS.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => onNavigate(item.path)}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200"
                      style={{
                        color: activeMorePath === item.path ? COLORS.active : COLORS.inactive,
                        background: activeMorePath === item.path ? 'rgba(255,255,255,0.78)' : 'transparent',
                      }}
                    >
                      <item.icon strokeWidth={2.1} className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-indigo/10 px-4 py-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-indigo/10 bg-white/55 px-4 py-3 text-sm font-medium text-ink/70 transition-colors hover:bg-white/80"
                >
                  <X className="h-4 w-4" strokeWidth={2.2} />
                  Close
                </button>
              </div>
            </Surface>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const moreButtonRef = useRef(null);
  const activeMainPath = useMemo(() => getActiveMainPath(pathname), [pathname]);
  const activeMorePath = useMemo(() => getActiveMorePath(pathname), [pathname]);
  const moreIsActive = activeMorePath !== null;

  useEffect(() => {
    setDesktopMoreOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMoreOpen) return;

    const handlePointerDown = (event) => {
      const button = moreButtonRef.current;
      if (button && button.contains(event.target)) return;
      setDesktopMoreOpen(false);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [desktopMoreOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (media.matches) setMobileMenuOpen(false);
    };
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const handleMoreItemClick = useCallback((path) => {
    setDesktopMoreOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  }, [navigate]);

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 pt-3 sm:px-6 lg:px-8">
        <BrandLink />

        <div className="hidden md:flex md:ml-auto">
          <div
            className="relative flex items-center gap-1 rounded-full border px-2 py-1.5"
            style={{
              borderColor: COLORS.border,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.34))',
              backdropFilter: 'blur(10px) saturate(140%)',
              WebkitBackdropFilter: 'blur(10px) saturate(140%)',
              boxShadow: '0 12px 28px -22px rgba(14,48,97,0.24), inset 0 1px 0 rgba(255,255,255,0.82)',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem
                key={item.path}
                item={item}
                active={activeMainPath === item.path}
              />
            ))}

            <div className="relative" ref={moreButtonRef}>
              <MoreButton
                open={desktopMoreOpen}
                active={moreIsActive || desktopMoreOpen}
                onToggle={() => {
                  setDesktopMoreOpen((value) => !value);
                }}
              />

              <AnimatePresence>
                {desktopMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={MOTION.panel}
                    className="absolute right-0 top-full mt-3 w-56"
                  >
                    <Surface role="menu" id="more-menu" labelledBy="more-menu-button">
                      <div className="flex flex-col gap-1 p-2">
                        {MORE_ITEMS.map((item) => (
                          <button
                            key={item.path}
                            type="button"
                            role="menuitem"
                            onClick={() => handleMoreItemClick(item.path)}
                            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200"
                            style={{
                              color: activeMorePath === item.path ? COLORS.active : COLORS.inactive,
                              background: activeMorePath === item.path ? 'rgba(255,255,255,0.78)' : 'transparent',
                            }}
                          >
                            <item.icon strokeWidth={2.1} className="h-4 w-4 shrink-0" />
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </Surface>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => {
              setMobileMenuOpen((value) => !value);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-200 hover:bg-white/60"
            style={{
              borderColor: mobileMenuOpen ? 'rgba(255,85,0,0.22)' : COLORS.border,
              background: mobileMenuOpen ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.42)',
              color: mobileMenuOpen ? COLORS.active : COLORS.inactive,
            }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={2.2} /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
          </button>
        </div>

        <MobileMenuPanel
          open={mobileMenuOpen}
          pathname={pathname}
          onNavigate={navigate}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}

function LegacyCell({ active, icon: Icon, label }) {
  return (
    <span
      className="flex h-full w-full flex-col items-center justify-center text-center"
      style={{
        gap: 'clamp(4px, 0.7vw, 7px)',
        borderRadius: 'clamp(18px, 2.6vw, 24px)',
        padding: 'clamp(5px, 0.8vw, 8px) 4px',
      }}
    >
      <span
        className="relative flex items-center justify-center transition-all duration-300"
        style={{
          width: 'clamp(38px, 5.8vw, 48px)',
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
          color: active ? COLORS.active : COLORS.inactive,
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,85,0,0.32), rgba(255,85,0,0))',
            opacity: active ? 1 : 0,
          }}
        />
        <Icon strokeWidth={2.1} style={{ width: 'clamp(22px, 3.6vw, 28px)', height: 'clamp(22px, 3.6vw, 28px)', flexShrink: 0 }} />
      </span>
      <span style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', lineHeight: 1, letterSpacing: '-0.01em', color: active ? COLORS.active : COLORS.inactive }}>
        {label}
      </span>
    </span>
  );
}

export function BottomGlassNavbarLegacy() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const moreButtonRef = useRef(null);
  const activeMainPath = useMemo(() => getActiveMainPath(pathname), [pathname]);
  const activeMorePath = useMemo(() => getActiveMorePath(pathname), [pathname]);
  const moreIsActive = activeMorePath !== null;

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event) => {
      const button = moreButtonRef.current;
      if (button && button.contains(event.target)) return;
      setDropdownOpen(false);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [dropdownOpen]);

  useEffect(() => {
    const updatePosition = () => {
      const button = moreButtonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        bottom: window.innerHeight - rect.top + 14,
        right: window.innerWidth - rect.right,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [pathname]);

  const handleMoreItemClick = useCallback((path) => {
    setDropdownOpen(false);
    navigate(path);
  }, [navigate]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[49] flex justify-center pointer-events-none" style={{ padding: `0 clamp(8px, 2vw, 16px) calc(env(safe-area-inset-bottom) + clamp(8px, 1.6vw, 14px))` }}>
      <nav
        aria-label="Bottom navigation"
        className="relative pointer-events-auto"
        style={{
          width: 'clamp(280px, 90vw, 420px)',
          borderRadius: 'clamp(28px, 4vw, 34px)',
          padding: 'clamp(8px, 1.25vw, 12px) clamp(8px, 1.5vw, 14px)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.54) 0%, rgba(255,255,255,0.30) 100%)',
          backdropFilter: 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(150%)',
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 16px 36px -24px rgba(15,23,42,0.34), 0 8px 18px -14px rgba(255,85,0,0.12), inset 0 1px 0 rgba(255,255,255,0.82)',
        }}
      >
        <div
          className="relative grid items-stretch"
          style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(1px, 0.55vw, 6px)' }}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="block min-w-0"
            >
              <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.975 }} transition={MOTION.item} className="h-full w-full">
                <LegacyCell active={activeMainPath === item.path} icon={item.icon} label={item.name} />
              </motion.div>
            </NavLink>
          ))}

          <div className="relative min-w-0" ref={moreButtonRef}>
            <button
              type="button"
              id="more-menu-button"
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-controls="more-menu"
              onClick={() => {
                setDropdownOpen((value) => !value);
              }}
              className="block h-full w-full min-w-0 focus:outline-none"
            >
              <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.975 }} transition={MOTION.item} className="h-full w-full">
                <LegacyCell active={moreIsActive || dropdownOpen} icon={Ellipsis} label="More" />
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownOpen && dropdownPosition && (
                <motion.div
                  id="more-menu"
                  role="menu"
                  aria-labelledby="more-menu-button"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={MOTION.panel}
                  className="fixed z-[50]"
                  style={{
                    right: `${dropdownPosition.right}px`,
                    bottom: `${dropdownPosition.bottom}px`,
                    minWidth: 'clamp(140px, 30vw, 176px)',
                    isolation: 'isolate',
                  }}
                >
                  <Surface>
                    <div className="flex flex-col gap-1 p-2" role="none">
                      {MORE_ITEMS.map((item) => (
                        <button
                          key={item.path}
                          type="button"
                          role="menuitem"
                          onClick={() => handleMoreItemClick(item.path)}
                          className="flex w-full items-center gap-2.5 rounded-[1.1rem] px-4 py-2.5 text-left text-sm tracking-tight transition-colors duration-200"
                          style={{
                            color: activeMorePath === item.path ? COLORS.active : COLORS.inactive,
                            background: activeMorePath === item.path ? 'rgba(255,255,255,0.60)' : 'transparent',
                            fontWeight: activeMorePath === item.path ? 600 : 400,
                          }}
                        >
                          <item.icon strokeWidth={2.1} className="h-4 w-4 shrink-0" />
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </Surface>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
}

