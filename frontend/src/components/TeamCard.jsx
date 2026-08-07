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
    <div
      className={`group relative h-full bg-indigo border border-indigo/20 rounded-3xl transition-all duration-300 hover:border-signal/40 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(14,48,97,0.3)] select-none ${
        featured ? 'p-4 sm:p-5 md:flex md:gap-6 md:items-center md:col-span-2' : 'p-4 sm:p-5 md:p-5'
      } flex flex-row md:flex-col md:justify-start gap-4 md:gap-0`}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-indigo/5 rounded-2xl shrink-0 ${
          featured ? 'w-24 h-32 sm:w-28 sm:h-36 md:w-full md:h-36' : 'w-24 h-32 sm:w-28 sm:h-36 md:w-full md:h-44'
        } flex items-center justify-center`}
      >
        <img
          src={imgSrc}
          alt={member.name}
          onError={handleImageError}
          className="w-full h-full object-cover md:object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-indigo/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0 flex flex-col justify-center pt-1 md:pt-0">
        <div>
          <span className="font-heading text-[10px] md:text-xs text-signal font-bold uppercase tracking-wider block mb-1 leading-tight">
            {member.role} {member.batch && `// ${member.batch}`}
          </span>
          <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-paper group-hover:text-signal uppercase leading-tight tracking-wide mb-2 transition-colors duration-300">
            {member.name}
          </h3>
          {member.bio && (
            <p className="font-body text-[11px] sm:text-xs text-paper/70 leading-relaxed mb-3 max-w-sm font-light">
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
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`${member.name}'s Instagram`}
            >
              <Instagram strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={member.socials.email}
              className="text-paper/40 hover:text-signal transition-colors duration-300"
              aria-label={`Email ${member.name}`}
            >
              <Mail strokeWidth={1.5} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
