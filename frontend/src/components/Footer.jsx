import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-indigo text-paper/80 pt-16 pb-8 px-6 border-t-[3px] border-ink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand narrative block */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <Link to="/" className="text-2xl font-semibold font-display text-paper flex items-center gap-2 mb-4 select-none">
              <span className="text-3xl text-signal font-bold">δ</span> DELTA
            </Link>
            <p className="font-body text-sm max-w-sm leading-relaxed text-paper/70 font-light">
              Data Oriented Thinkers' Association. Linking academic discovery with technological innovation in Data Science, AI, and emerging computer fields at Christ College of Engineering.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-signal transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram strokeWidth={1.5} className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-signal transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin strokeWidth={1.5} className="w-5 h-5" />
            </a>
            <a
              href="mailto:delta@cce.edu.in"
              className="text-paper/60 hover:text-signal transition-colors duration-300"
              aria-label="Email"
            >
              <Mail strokeWidth={1.5} className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm font-semibold text-paper tracking-wider uppercase mb-6">Quick Links</h4>
          <ul className="space-y-3 font-body text-sm font-light">
            <li>
              <Link to="/about" className="hover:text-signal transition-colors duration-300">
                About DELTA
              </Link>
            </li>
            <li>
              <Link to="/committee" className="hover:text-signal transition-colors duration-300">
                Executive Committee
              </Link>
            </li>
            <li>
              <Link to="/brand" className="hover:text-signal transition-colors duration-300">
                Brand Identity
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-signal transition-colors duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Address and Contact info */}
        <div>
          <h4 className="font-display text-sm font-semibold text-paper tracking-wider uppercase mb-6">Contact</h4>
          <ul className="space-y-4 font-body text-sm font-light">
            <li className="flex items-start gap-3">
              <MapPin strokeWidth={1.5} className="w-5 h-5 text-signal shrink-0 mt-0.5" />
              <span>
                Christ College of Engineering,
                <br />
                Irinjalakuda, Thrissur,
                <br />
                Kerala — 680125
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail strokeWidth={1.5} className="w-5 h-5 text-signal shrink-0" />
              <a href="mailto:delta@cce.edu.in" className="hover:text-signal transition-colors duration-300">
                delta@cce.edu.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="font-heading text-paper/50">
          © 2026 DELTA — "Connecting the dots, driving the change."
        </p>
        <p className="font-body text-paper/40">
          Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
