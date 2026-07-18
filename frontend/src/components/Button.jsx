import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, to, href, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center font-heading text-xs md:text-sm font-bold tracking-wider uppercase px-6 py-3.5 rounded-full transition-all duration-300 border-2 select-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-signal border-signal text-paper hover:bg-transparent hover:text-signal shadow-[0_4px_14px_rgba(254,87,42,0.15)] hover:shadow-[0_6px_20px_rgba(254,87,42,0.25)]",
    secondary: "border-indigo text-indigo hover:bg-indigo hover:text-paper",
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
