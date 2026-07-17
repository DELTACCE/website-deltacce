import React from 'react';
import SectionHeading from '../components/SectionHeading';
import ColorSwatch from '../components/ColorSwatch';
import Card from '../components/Card';
import { Download } from 'lucide-react';

export default function Brand() {
  const brandColors = [
    { name: "Deep Indigo", hex: "#0e3061", role: "Primary heading text, brand logo mark, navigation anchor base." },
    { name: "Signal Orange", hex: "#fe572a", role: "Interactive highlights, primary CTAs, hover glows, and node connection vectors." },
    { name: "Teal Green", hex: "#065964", role: "Secondary labels, structural dividers, numeric tags, and sub-anchors." },
    { name: "Charcoal Ink", hex: "#2a2a28", role: "Charcoal body copy text, paragraphs, descriptions, and inputs." },
    { name: "Paper Cream", hex: "#f7f1e4", role: "Primary canvas background, panels, layouts, and cards." }
  ];

  const designPrinciples = [
    {
      title: "Minimal",
      description: "Focus on white space and generous paddings. Eliminate unnecessary visual noise so data details stand out."
    },
    {
      title: "Modern",
      description: "Utilize CSS grid layouts, smooth transitions, and thin border lines to project a professional tech organization."
    },
    {
      title: "Geometric",
      description: "Incorporate sharp corners, coordinate crosshairs, and pixel alignments. Avoid excessive roundness."
    },
    {
      title: "Data-Inspired",
      description: "Integrate particle streams, connecting lines, code comments, and terminal-like monospaced tags."
    }
  ];

  return (
    <div className="bg-paper py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-20">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
            {"// VISUAL LANGUAGE"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-6">
            Connecting dots.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">Creating delta.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            The brand identity of the Data Oriented Thinkers' Association bridges technical rigor with modern geometric layouts. Here is our official design specification.
          </p>
        </section>

        {/* 1. Logo Configurations */}
        <section className="mb-24">
          <SectionHeading eyebrow="01 / MARKS" heading="Logo System" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Primary Logo */}
              <div className="border border-indigo/10 p-6 bg-paper/40 flex flex-col items-center justify-between min-h-[160px] text-center select-none group hover:border-signal/30 transition-all duration-300">
                <div className="flex items-center gap-2 text-indigo font-heading font-extrabold text-xl py-6">
                  <span className="text-2xl text-signal">δ</span> DELTA
                </div>
                <span className="font-heading text-[10px] text-teal font-bold tracking-wider uppercase">01 // PRIMARY</span>
              </div>

              {/* Accent Orange */}
              <div className="border border-indigo/10 p-6 bg-paper/40 flex flex-col items-center justify-between min-h-[160px] text-center select-none group hover:border-signal/30 transition-all duration-300">
                <div className="flex items-center gap-2 text-signal font-heading font-extrabold text-xl py-6">
                  <span className="text-2xl text-indigo">δ</span> DELTA
                </div>
                <span className="font-heading text-[10px] text-teal font-bold tracking-wider uppercase">02 // ACCENT</span>
              </div>

              {/* Monochrome */}
              <div className="border border-indigo/10 p-6 bg-paper/40 flex flex-col items-center justify-between min-h-[160px] text-center select-none group hover:border-signal/30 transition-all duration-300">
                <div className="flex items-center gap-2 text-indigo font-heading font-extrabold text-xl py-6">
                  <span className="text-2xl text-indigo">δ</span> DELTA
                </div>
                <span className="font-heading text-[10px] text-teal font-bold tracking-wider uppercase">03 // MONOCHROME</span>
              </div>

              {/* Icon Only */}
              <div className="border border-indigo/10 p-6 bg-paper/40 flex flex-col items-center justify-between min-h-[160px] text-center select-none group hover:border-signal/30 transition-all duration-300">
                <div className="text-indigo font-heading font-extrabold text-4xl py-4 select-none">
                  <span className="text-signal">δ</span>
                </div>
                <span className="font-heading text-[10px] text-teal font-bold tracking-wider uppercase">04 // ICON MARK</span>
              </div>

            </div>

            {/* Logo Philosophy */}
            <div className="lg:col-span-4 font-body text-sm text-ink/80 leading-relaxed flex flex-col justify-center">
              <h4 className="font-heading text-xs text-signal font-bold uppercase tracking-wider mb-3">
                {"// EMBLEM CONCEPT"}
              </h4>
              <p className="mb-4">
                The lowercase **δ (Delta)** symbol represents mathematical change and computational optimization. Formed from a single vector line, it suggests fluid logic, integration, and continuous evolution.
              </p>
              <p>
                The linear thickness mimics code outlines and structural architecture prints, mirroring DELTA's mission: connecting dots of potential to create a delta of progress.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Color Palette */}
        <section className="mb-24">
          <SectionHeading eyebrow="02 / PALETTE" heading="Color System" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            {brandColors.map((color, idx) => (
              <ColorSwatch 
                key={idx}
                name={color.name}
                hex={color.hex}
                role={color.role}
              />
            ))}
          </div>
        </section>

        {/* 3. Typography System */}
        <section className="mb-24">
          <SectionHeading eyebrow="03 / GLYPHS" heading="Typography" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            
            {/* Heading Spec */}
            <div className="border border-indigo/10 p-8 bg-paper/40">
              <span className="font-heading text-[10px] text-teal font-bold tracking-wider block mb-4 uppercase">
                Primary Headings // JetBrains Mono
              </span>
              <div className="font-heading">
                <span className="text-4xl font-extrabold text-indigo block uppercase tracking-tight mb-2">
                  Aa Bb Cc 123
                </span>
                <p className="text-xs text-ink/60 mb-6 leading-relaxed select-none">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
                  a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
                  0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * ( ) _ +
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-indigo/5 pb-1">
                    <span className="font-bold text-indigo">H1 HEADLINE LARGE</span>
                    <span className="text-teal">Space/JetBrains Mono - 4xl</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo/5 pb-1">
                    <span className="font-semibold text-indigo">H2 Section Eyebrow</span>
                    <span className="text-teal">Space/JetBrains Mono - 2xl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo">H3 Component Label</span>
                    <span className="text-teal">Space/JetBrains Mono - lg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Spec */}
            <div className="border border-indigo/10 p-8 bg-paper/40">
              <span className="font-heading text-[10px] text-teal font-bold tracking-wider block mb-4 uppercase">
                Body Copy // Inter
              </span>
              <div className="font-body">
                <span className="text-4xl text-ink font-light block mb-2">
                  Aa Bb Cc 123
                </span>
                <p className="text-xs text-ink/60 mb-6 leading-relaxed select-none">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
                  a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
                  0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * ( ) _ +
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-indigo/5 pb-1">
                    <span className="font-medium text-ink">Body Lead Text</span>
                    <span className="text-teal">Inter Medium - 16px</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo/5 pb-1">
                    <span className="text-ink">Paragraph Text Normal</span>
                    <span className="text-teal">Inter Regular - 14px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Small Footer/Caption</span>
                    <span className="text-teal">Inter Light - 12px</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Design Principles */}
        <section className="mb-24">
          <SectionHeading eyebrow="04 / RULES" heading="Design Principles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {designPrinciples.map((item, idx) => (
              <Card 
                key={idx}
                title={item.title}
                description={item.description}
                hoverEffect={true}
              />
            ))}
          </div>
        </section>

        {/* 5. Downloads Placeholder */}
        <section className="border border-indigo/10 bg-paper/20 p-8 md:p-12 text-center relative select-none">
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-l border-t border-signal"></div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-r border-b border-signal"></div>
          
          <div className="max-w-md mx-auto flex flex-col items-center">
            <Download strokeWidth={1.5} className="w-10 h-10 text-indigo/35 mb-4" />
            <h3 className="font-heading text-lg font-extrabold text-indigo uppercase mb-2 tracking-wide">
              Brand Assets Package
            </h3>
            <p className="font-body text-sm text-ink/75 leading-relaxed mb-6">
              Download vectors of the logo mark, high-resolution headers, official typography kits, and styling stylesheets.
            </p>
            <button 
              disabled 
              className="inline-flex items-center gap-2 border-2 border-indigo/20 text-indigo/40 px-6 py-3 font-heading text-xs font-bold tracking-wider uppercase cursor-not-allowed select-none bg-paper/10"
            >
              ASSETS PENDING RELEASE
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
