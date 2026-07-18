import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, to, href, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center font-heading text-xs md:text-sm font-bold tracking-wider uppercase px-6 py-3 rounded-full border-[3px] border-ink select-none transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#2a2a28]";
  
  const variants = {
    primary: "bg-signal text-paper shadow-[4px_4px_0px_0px_#2a2a28] hover:bg-signal/95 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#2a2a28]",
    secondary: "bg-paper text-ink shadow-[4px_4px_0px_0px_#2a2a28] hover:bg-paper/85 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#2a2a28]",
    indigo: "bg-indigo text-paper shadow-[4px_4px_0px_0px_#2a2a28] hover:bg-indigo/95 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#2a2a28]",
    teal: "bg-teal text-paper shadow-[4px_4px_0px_0px_#2a2a28] hover:bg-teal/95 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#2a2a28]",
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
