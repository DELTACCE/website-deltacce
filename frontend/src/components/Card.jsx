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
    group relative bg-indigo border border-indigo/20 p-6 md:p-8 rounded-3xl transition-all duration-300 select-none
    ${hoverEffect ? 'hover:border-signal/40 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(14,48,97,0.3)]' : ''}
    ${className}
  `;

  return (
    <div className={cardStyle}>
      {/* Corner Icon */}
      {Icon && (
        <div className={`absolute ${iconPosition === 'top-right' ? 'top-6 right-6' : 'top-6 left-6'} text-paper/30 group-hover:text-signal transition-colors duration-300`}>
          <Icon strokeWidth={1.5} className="w-8 h-8" />
        </div>
      )}

      {/* Content */}
      <div className={`${Icon && iconPosition === 'top-left' ? 'pt-8' : ''}`}>
        <h3 className="font-heading text-lg font-bold text-paper group-hover:text-signal uppercase mb-3 pr-8 tracking-wide transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-paper/80 font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
