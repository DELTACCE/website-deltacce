import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-indigo/10 py-4 px-6 font-heading">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo flex items-center gap-2">
          <span className="text-2xl text-signal">δ</span> DELTA
        </Link>
        <div className="flex gap-6 text-sm">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-signal font-bold" : "text-indigo hover:text-signal transition-colors"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-signal font-bold" : "text-indigo hover:text-signal transition-colors"}>About</NavLink>
          <NavLink to="/committee" className={({ isActive }) => isActive ? "text-signal font-bold" : "text-indigo hover:text-signal transition-colors"}>Committee</NavLink>
          <NavLink to="/brand" className={({ isActive }) => isActive ? "text-signal font-bold" : "text-indigo hover:text-signal transition-colors"}>Brand</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-signal font-bold" : "text-indigo hover:text-signal transition-colors"}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
