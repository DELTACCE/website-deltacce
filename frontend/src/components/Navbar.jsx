import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu and dropdown on path changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Committee', path: '/committee' },
    { name: 'Brand', path: '/brand' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic dropdown grouping: if we have more than 4 links, we group the remaining into a dropdown.
  const LIMIT = 4;
  const hasManyLinks = navLinks.length > LIMIT;
  const visibleLinks = hasManyLinks ? navLinks.slice(0, LIMIT - 1) : navLinks;
  const dropdownLinks = hasManyLinks ? navLinks.slice(LIMIT - 1) : [];

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl bg-paper border-[3px] border-ink py-2.5 px-6 rounded-full shadow-[4px_4px_0px_0px_#2a2a28] flex items-center justify-between font-heading transition-all duration-300">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-ink flex items-center gap-2 group select-none">
            <span className="text-2xl text-signal font-extrabold transition-transform duration-300 group-hover:rotate-12">
              δ
            </span>
            <span className="tracking-widest text-ink group-hover:text-signal transition-colors duration-300">DELTA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 text-sm relative">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1.5 px-3 transition-colors duration-300 hover:text-signal tracking-wide font-medium ${
                    isActive ? 'text-signal' : 'text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Dropdown for remaining links */}
            {hasManyLinks && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 py-1.5 px-3 text-ink hover:text-signal font-medium transition-colors duration-300 focus:outline-none"
                >
                  <span>More</span>
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Click-away backdrop */}
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-paper border-[3px] border-ink rounded-2xl shadow-[4px_4px_0px_0px_#2a2a28] py-2 z-20 overflow-hidden"
                      >
                        {dropdownLinks.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setDropdownOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-xs tracking-wide font-medium transition-colors duration-200 hover:bg-ink/5 ${
                                isActive ? 'text-signal' : 'text-ink'
                              }`
                            }
                          >
                            {link.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ink hover:text-signal p-1 focus:outline-none transition-colors duration-300 z-50"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X strokeWidth={1.5} className="w-6 h-6" />
            ) : (
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-paper z-[100] flex flex-col p-6 md:hidden overflow-y-auto"
          >
            {/* Header inside overlay */}
            <div className="flex justify-between items-center pb-6 border-b-[3px] border-ink">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold text-ink flex items-center gap-2 select-none">
                <span className="text-2xl text-signal font-extrabold">δ</span>
                <span className="tracking-widest text-ink">DELTA</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink hover:text-signal p-2 focus:outline-none transition-colors"
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} className="w-8 h-8" />
              </button>
            </div>

            {/* Main Content inside overlay */}
            <div className="flex-grow flex flex-col justify-between py-12">
              {/* Navigation links in massive display typography */}
              <div className="flex flex-col gap-5 pl-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.path}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-4xl font-display tracking-wide uppercase transition-colors duration-300 block ${
                          isActive ? 'text-signal font-bold' : 'text-ink hover:text-signal'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Tagline & Info Box in Outlined Card style */}
              <div className="mt-8 border-[3px] border-ink bg-paper p-6 rounded-3xl relative shadow-[5px_5px_0px_0px_#2a2a28]">
                <div className="font-heading text-[10px] text-teal font-bold tracking-widest uppercase mb-4">
                  CONNECTING THE DOTS. CREATING THE DELTA.
                </div>
                <h2 className="font-display text-xl font-semibold text-ink uppercase mb-3">
                  DATA DRIVEN. THOUGHT LED.
                </h2>
                <p className="font-body text-xs leading-relaxed text-ink/80 mb-6">
                  DELTA is the student-led Data Science and Emerging Technology association at Christ College of Engineering, Thrissur. We bridge standard curriculum with dynamic industrial engineering to create real-world impact.
                </p>
                
                {/* Action buttons inside mobile menu */}
                <div className="flex flex-col gap-3">
                  <Button
                    to="/committee"
                    onClick={() => setIsOpen(false)}
                    variant="primary"
                    className="w-full text-center"
                  >
                    MEET THE TEAM
                  </Button>
                  <Button
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="w-full text-center"
                  >
                    EXPLORE DELTA
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
