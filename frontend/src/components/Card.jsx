import React from 'react';

export default function Card({ 
  icon: Icon, 
  title, 
  description, 
  iconPosition = 'top-right', 
  hoverEffect = true,
  className = '' 
}) {
  const cardStyle = `
    group relative bg-paper/40 border border-indigo/10 p-6 md:p-8 transition-all duration-300 select-none
    ${hoverEffect ? 'hover:border-signal/30 hover:bg-paper/70 hover:-translate-y-1 hover:shadow-[0_10px_25px_-15px_rgba(254,87,42,0.15)]' : ''}
    ${className}
  `;

  return (
    <div className={cardStyle}>
      {/* Corner Icon */}
      {Icon && (
        <div className={`absolute ${iconPosition === 'top-right' ? 'top-6 right-6' : 'top-6 left-6'} text-indigo/40 group-hover:text-signal transition-colors duration-300`}>
          <Icon strokeWidth={1.5} className="w-8 h-8" />
        </div>
      )}

      {/* Content */}
      <div className={`${Icon && iconPosition === 'top-left' ? 'pt-8' : ''}`}>
        <h3 className="font-heading text-lg font-extrabold text-indigo uppercase mb-3 pr-8 tracking-wide">
          {title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-ink/80">
          {description}
        </p>
      </div>
      
      {/* Blueprint Corner Accent Accent lines */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-indigo/20 group-hover:border-signal/40 transition-colors duration-300"></div>
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-indigo/20 group-hover:border-signal/40 transition-colors duration-300"></div>
    </div>
  );
}
