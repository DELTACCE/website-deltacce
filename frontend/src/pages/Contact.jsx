import React from 'react';
import { Mail, MapPin, Instagram, Linkedin, Github } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Location",
      content: (
        <span>
          Christ College of Engineering,<br />
          Irinjalakuda, Thrissur,<br />
          Kerala — 680125
        </span>
      ),
      actionLabel: "View on Google Maps",
      actionUrl: "https://maps.google.com/?q=Christ+College+of+Engineering+Irinjalakuda"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: <span>delta@cce.edu.in</span>,
      actionLabel: "Send Email Directly",
      actionUrl: "mailto:delta@cce.edu.in"
    }
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: Github, label: "GitHub", url: "https://github.com" }
  ];

  return (
    <div className="bg-paper py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-20">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-4">
            {"// LINK SYSTEMS"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo uppercase leading-none tracking-tight mb-6">
            Get in touch.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">Connect the dots.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed">
            Have questions, research collaborations, or want to join our network? Reach out to us through our direct lines or the contact form below.
          </p>
        </section>

        {/* Form and Contact Detail Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            
            {/* Swatch-style details cards */}
            <div className="space-y-8">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="group border border-indigo/10 bg-paper/40 p-6 relative hover:border-signal/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-indigo/20 group-hover:border-signal/40 transition-colors"></div>
                    <div className="flex gap-4">
                      <Icon strokeWidth={1.5} className="w-6 h-6 text-signal shrink-0 mt-1" />
                      <div>
                        <h4 className="font-heading text-sm font-extrabold text-indigo uppercase tracking-wider mb-2">
                          {detail.title}
                        </h4>
                        <div className="font-body text-sm text-ink/75 leading-relaxed mb-4">
                          {detail.content}
                        </div>
                        <a 
                          href={detail.actionUrl} 
                          target={detail.actionUrl.startsWith('mailto') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="font-heading text-xs font-bold text-teal hover:text-signal transition-colors inline-flex items-center gap-1.5"
                        >
                          {detail.actionLabel} &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social handles */}
            <div className="border border-indigo/10 bg-paper/40 p-6 relative">
              <h4 className="font-heading text-xs text-signal font-bold uppercase tracking-wider mb-4">
                {"// CHANNELS"}
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 border border-indigo/10 px-4 py-2 hover:border-signal/30 bg-paper/30 hover:bg-paper transition-all duration-300"
                    >
                      <Icon strokeWidth={1.5} className="w-4 h-4 text-indigo/60 group-hover:text-signal transition-colors" />
                      <span className="font-heading text-xs text-indigo font-bold tracking-wider group-hover:text-indigo">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Embedded Google Map Section */}
        <section className="mb-8">
          <SectionHeading eyebrow="01 / COORDINATES" heading="Location Map" />
          
          <div className="border border-indigo/15 bg-paper/30 p-2 mt-10 relative overflow-hidden select-none">
            {/* Blueprint Grid Lines on Overlay */}
            <div className="absolute top-2 left-2 z-10 font-heading text-[10px] text-indigo/50 bg-paper/85 px-2 py-1 border border-indigo/10 pointer-events-none uppercase">
              GRID_COORD: 10.3601 N, 76.2163 E
            </div>
            
            <div className="w-full h-96 overflow-hidden bg-indigo/5 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
              <iframe
                title="Christ College of Engineering Irinjalakuda Map"
                src="https://maps.google.com/maps?q=Christ%20College%20of%20Engineering%20Irinjalakuda&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
