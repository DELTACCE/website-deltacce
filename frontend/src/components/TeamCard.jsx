import React, { useState } from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { getDriveImageUrl } from '../data/committee';

export default function TeamCard({ member, featured = false }) {
  const [imgSrc, setImgSrc] = useState(() => getDriveImageUrl(member.driveId));

  const handleImageError = () => {
    // Fallback seed avatar in case the Google Drive link fails
    setImgSrc(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=0e3061,065964&textColor=f7f1e4`);
  };

  return (
    <div className={`group relative bg-paper/40 border border-indigo/10 p-5 transition-all duration-300 hover:border-signal/30 hover:bg-paper/70 ${featured ? 'md:flex md:gap-6 md:items-center md:col-span-2' : ''} select-none`}>
      {/* Blueprint Corner Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-indigo/20 group-hover:border-signal/40 transition-colors duration-300"></div>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r border-b border-indigo/20 group-hover:border-signal/40 transition-colors duration-300"></div>

      {/* Image container */}
      <div className={`relative overflow-hidden bg-indigo/5 border border-indigo/10 mb-4 md:mb-0 shrink-0 ${featured ? 'w-full md:w-36 h-40 md:h-36' : 'w-full h-44'} flex items-center justify-center`}>
        <img
          src={imgSrc}
          alt={member.name}
          onError={handleImageError}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-indigo/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between pt-1">
        <div>
          <span className="font-heading text-[10px] md:text-xs text-teal font-bold uppercase tracking-wider block mb-1">
            {member.role} {member.batch && `// ${member.batch}`}
          </span>
          <h3 className="font-heading text-base md:text-lg font-extrabold text-indigo uppercase leading-tight tracking-wide mb-2">
            {member.name}
          </h3>
          {member.bio && (
            <p className="font-body text-xs text-ink/70 leading-relaxed mb-3 max-w-sm">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mt-1">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo/50 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin strokeWidth={1.5} className="w-4 h-4" />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo/50 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s Instagram`}
            >
              <Instagram strokeWidth={1.5} className="w-4 h-4" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={member.socials.email}
              className="text-indigo/50 hover:text-signal transition-colors duration-300"
              aria-label={`Email ${member.name}`}
            >
              <Mail strokeWidth={1.5} className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
