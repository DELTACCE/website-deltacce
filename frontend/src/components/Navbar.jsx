import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
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

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-indigo/10 py-4 px-6 font-heading">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo flex items-center gap-2 group select-none">
          <span className="text-2xl text-signal font-extrabold transition-transform duration-300 group-hover:rotate-12">
            δ
          </span>
          <span className="tracking-widest text-indigo group-hover:text-signal transition-colors duration-300">DELTA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors duration-300 hover:text-signal tracking-wide ${
                  isActive ? 'text-signal font-semibold' : 'text-indigo'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-signal"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-indigo hover:text-signal p-1 focus:outline-none transition-colors duration-300 z-50"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <X strokeWidth={1.5} className="w-6 h-6" />
          ) : (
            <Menu strokeWidth={1.5} className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[61px] bottom-0 bg-paper/98 backdrop-blur-lg z-40 md:hidden flex flex-col justify-start pt-12 px-8 gap-6 border-t border-indigo/5"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={link.path}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-2xl tracking-wide ${
                      isActive ? 'text-signal font-bold' : 'text-indigo'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
