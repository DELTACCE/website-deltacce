import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ColorSwatch({ name, hex, role }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group border border-indigo/10 bg-paper/40 p-4 transition-all duration-300 hover:border-signal/30 hover:bg-paper/70 flex flex-col justify-between select-none relative">
      {/* Blueprint Corner Accents */}
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-indigo/20 group-hover:border-signal/30 transition-colors duration-300"></div>
      
      <div>
        {/* Color Block */}
        <div 
          className="w-full h-24 border border-indigo/10 mb-4 transition-transform duration-300 group-hover:scale-[1.01]"
          style={{ backgroundColor: hex }}
        ></div>
        
        {/* Label */}
        <h4 className="font-heading text-sm font-extrabold text-indigo uppercase mb-1">
          {name}
        </h4>
        <p className="font-body text-xs text-ink/75 leading-relaxed mb-4">
          {role}
        </p>
      </div>

      {/* Hex & Copy */}
      <div className="flex justify-between items-center pt-2 border-t border-indigo/5 font-heading text-xs">
        <span className="text-teal font-bold">{hex.toUpperCase()}</span>
        <button
          onClick={copyToClipboard}
          className="text-indigo/50 hover:text-signal transition-colors p-1"
          aria-label={`Copy hex code for ${name}`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
