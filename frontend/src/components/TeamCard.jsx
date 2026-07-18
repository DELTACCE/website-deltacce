import React, { useState } from 'react';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { getDriveImageUrl } from '../data/committee';

export default function TeamCard({ member, featured = false, tiltAngle = 0 }) {
  const [imgSrc, setImgSrc] = useState(() => getDriveImageUrl(member.driveId));

  const handleImageError = () => {
    setImgSrc(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=0e3061,065964&textColor=f7f1e4`);
  };

  return (
    <div
      style={{
        transform: tiltAngle ? `rotate(${tiltAngle}deg)` : undefined,
      }}
      className={`group relative bg-indigo border-[3px] border-ink p-5 rounded-3xl shadow-[5px_5px_0px_0px_#2a2a28] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_0px_#2a2a28] ${featured ? 'md:flex md:gap-6 md:items-center md:col-span-2' : ''} select-none`}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden bg-paper/10 border-[3px] border-ink rounded-2xl mb-4 md:mb-0 shrink-0 ${featured ? 'w-full md:w-36 h-40 md:h-36' : 'w-full h-44'} flex items-center justify-center`}>
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
          <span className="font-heading text-[10px] md:text-xs text-signal font-bold uppercase tracking-wider block mb-1">
            {member.role} {member.batch && `// ${member.batch}`}
          </span>
          <h3 className="font-display text-base md:text-lg font-bold text-paper group-hover:text-signal uppercase leading-tight tracking-wide mb-2 transition-colors duration-300">
            {member.name}
          </h3>
          {member.bio && (
            <p className="font-body text-xs text-paper/70 leading-relaxed mb-3 max-w-sm font-light">
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
              <Linkedin strokeWidth={1.5} className="w-4 h-4" />
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
              <Instagram strokeWidth={1.5} className="w-4 h-4" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={member.socials.email}
              className="text-paper/40 hover:text-signal transition-colors duration-300"
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
