import React from 'react';
import { Terminal, Cpu, Trophy, Globe, Users, Lightbulb, ArrowRight } from 'lucide-react';
import BlobDivider from '../components/BlobDivider';
import SectionHeading from '../components/SectionHeading';
import OutlinedCard from '../components/OutlinedCard';
import TeamCard from '../components/TeamCard';
import Button from '../components/Button';
import { committeeData } from '../data/committee';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  const facultyMember = committeeData.faculty;
  const featuredStudents = committeeData.core || [];

  const whatWeDoList = [
    {
      icon: Terminal,
      title: "Workshops & Bootcamps",
      description: "Hands-on, immersive training in Python, analytics frameworks, machine learning, and emerging technical stacks.",
      tilt: -2.5,
      bg: "bg-signal",
      text: "text-paper"
    },
    {
      icon: Cpu,
      title: "Project Incubation",
      description: "Transforming theoretical ideas into tangible applications. We provide mentorship and collaboration circles.",
      tilt: 2,
      bg: "bg-teal",
      text: "text-paper"
    },
    {
      icon: Trophy,
      title: "Hackathons & Builds",
      description: "Hosting internal builds and training squads to compete in regional and national hackathons and coding tournaments.",
      tilt: -1.5,
      bg: "bg-indigo",
      text: "text-paper"
    },
    {
      icon: Globe,
      title: "Industry Connection",
      description: "Connecting students directly with tech leads, hosting expert sessions, and opening doors for project internships.",
      tilt: 3,
      bg: "bg-paper",
      text: "text-ink"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Fostering an open network of peers sharing code, discussing technical research, and learning collectively.",
      tilt: -2,
      bg: "bg-teal/15",
      text: "text-ink"
    },
    {
      icon: Lightbulb,
      title: "R&D Innovation",
      description: "Exploring scientific breakthroughs in Artificial Intelligence, Deep Learning, and quantitative data solutions.",
      tilt: 1.5,
      bg: "bg-signal/15",
      text: "text-ink"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-paper">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-signal text-ink px-6 pt-32 pb-24 overflow-hidden">
        {/* Subtle decorative dot grid vectors */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-5">
          <div className="absolute top-[20%] left-[10%] text-6xl">★</div>
          <div className="absolute bottom-[20%] right-[10%] text-6xl">★</div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 items-center">
          <ScrollReveal className="lg:col-span-8 flex flex-col justify-center text-left" delay={0.1}>
            {/* Tagline Indicator with handwritten tag */}
            <div className="relative inline-block self-start mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border-[3px] border-ink bg-paper rounded-full text-xs font-heading text-teal font-bold tracking-widest uppercase">
                <span className="w-2.5 h-2.5 bg-signal animate-ping rounded-full shrink-0"></span>
                <span>CONNECTING THE DOTS. CREATING THE DELTA.</span>
              </div>
              <span className="absolute -top-10 -right-20 font-accent text-2xl text-ink/90 rotate-[8deg] hidden md:block">
                ★ Built by students, for students!
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-ink uppercase leading-[0.9] tracking-tight mb-8 font-display">
              Data Driven.<br />
              <span className="text-paper">Thought Led.</span>
            </h1>
            
            <p className="font-body text-base md:text-lg text-ink/90 max-w-2xl leading-relaxed mb-10 font-normal">
              DELTA is the student-led Data Science and Emerging Technology association at Christ College of Engineering, Thrissur. We bridge standard curriculum with dynamic industrial engineering to create real-world impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button to="/committee" variant="indigo">
                Meet the Team
              </Button>
              <Button to="/about" variant="secondary">
                Explore DELTA
              </Button>
            </div>
          </ScrollReveal>
          
          {/* Asymmetrical tilted layered mockups */}
          <ScrollReveal className="hidden lg:flex lg:col-span-4 justify-end items-center select-none" delay={0.3} direction="left">
            <div className="relative w-80 h-80 select-none">
              {/* Layered tilted cards mimicking aardvark covers */}
              <div className="absolute inset-0 bg-teal border-[3px] border-ink rounded-3xl rotate-[-6deg] shadow-[6px_6px_0px_0px_#2a2a28]"></div>
              <div className="absolute inset-0 bg-paper border-[3px] border-ink rounded-3xl rotate-[3deg] shadow-[6px_6px_0px_0px_#2a2a28] flex flex-col items-center justify-center p-8">
                <span className="text-[12rem] font-bold font-display text-signal leading-none -translate-y-2 select-none">δ</span>
                <div className="absolute bottom-6 right-6 font-heading text-[10px] text-ink/40 leading-none text-right">
                  SYS_ACTIVE_2026<br />
                  <span className="text-signal font-bold">DOT_COUNT: 60</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blob transition from Hero to Main Content */}
      <BlobDivider fillClass="fill-paper" bgClass="bg-signal" />

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ScrollReveal className="lg:col-span-4">
          <SectionHeading eyebrow="01 / ORIGIN" heading="About DELTA" />
        </ScrollReveal>
        <ScrollReveal className="lg:col-span-8 flex flex-col justify-between" delay={0.15}>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-indigo uppercase mb-6 tracking-tight leading-snug">
              Bridging academic limits with active technical creation.
            </h3>
            <p className="font-body text-base text-ink/85 leading-relaxed mb-6">
              DELTA was formed in the Department of Computer Science & Engineering (Data Science) to foster a community of creators, analysts, and analytical thinkers. We emphasize research-informed coding and open collaboration.
            </p>
            <p className="font-body text-base text-ink/70 leading-relaxed mb-8 font-light">
              Through peer mentorship, workshops, hackathons, and research projects, we invite students to develop the critical capacities required to navigate the future data landscape.
            </p>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 font-display text-base font-bold text-signal hover:text-indigo transition-colors duration-300 group">
            LEARN MORE ABOUT DELTA 
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="py-20 px-6 bg-paper/50 border-t-[3px] border-ink">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="02 / BLUEPRINT" heading="Mission & Vision" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ScrollReveal delay={0.1}>
              <OutlinedCard
                tiltAngle={-2}
                bgClass="bg-indigo"
                className="text-paper"
              >
                <h3 className="font-display text-lg font-bold text-paper group-hover:text-signal uppercase mb-4 tracking-wide">
                  Our Mission
                </h3>
                <p className="font-body text-sm leading-relaxed text-paper/80 font-light">
                  To provide students with collaborative spaces, resources, and technical support to learn, build, and deploy data systems and Artificial Intelligence solutions.
                </p>
              </OutlinedCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <OutlinedCard
                tiltAngle={1.5}
                bgClass="bg-teal"
                className="text-paper"
              >
                <h3 className="font-display text-lg font-bold text-paper group-hover:text-signal uppercase mb-4 tracking-wide">
                  Our Vision
                </h3>
                <p className="font-body text-sm leading-relaxed text-paper/80 font-light">
                  To construct a premier student research ecosystem at CCE recognized for computational excellence, creativity, and ethical design in emerging technology.
                </p>
              </OutlinedCard>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <OutlinedCard
                tiltAngle={-1.5}
                bgClass="bg-paper"
                className="text-ink"
              >
                <h3 className="font-display text-lg font-bold text-indigo uppercase mb-4 tracking-wide">
                  Core Values
                </h3>
                <p className="font-body text-sm leading-relaxed text-ink/80 font-light">
                  Built on three fundamental guidelines: Analytical Rigor in problem-solving, Creative Thinking in architectural design, and Collective Growth across our community.
                </p>
              </OutlinedCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION */}
      <section className="py-20 px-6 border-t-[3px] border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="03 / FOCUS" heading="What We Do" className="mb-0" />
            <p className="font-body text-sm text-ink/75 max-w-md leading-relaxed">
              DELTA operates as an active hub, deploying programs that build technical competence and peer network resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {whatWeDoList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={(idx % 3) * 0.1}>
                  <OutlinedCard
                    tiltAngle={item.tilt}
                    bgClass={item.bg}
                    className={item.text}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide leading-tight">
                        {item.title}
                      </h3>
                      <Icon strokeWidth={1.5} className="w-8 h-8 opacity-70" />
                    </div>
                    <p className="font-body text-sm leading-relaxed opacity-90 font-light">
                      {item.description}
                    </p>
                  </OutlinedCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FOCUS AREAS (BIG DISPLAY WORD LIST) */}
      <section className="py-24 px-6 bg-indigo text-paper relative overflow-hidden text-center border-t-[3px] border-ink">
        {/* Marginals hand written accent annotation */}
        <span className="absolute top-20 right-[15%] font-accent text-3xl text-signal rotate-[8deg] select-none hidden md:block">
          ★ Future Proof!
        </span>

        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center select-none font-display">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase block mb-12">
            {"// CORE DOMAINS"}
          </span>
          <div className="flex flex-col gap-2 items-center justify-center leading-none">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-paper/90">
              DATA SCIENCE
            </div>
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-signal">
              ★ ARTIFICIAL INTELLIGENCE ★
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl font-accent text-teal-300 tracking-wide rotate-[-3deg] my-2">
              Machine Learning
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-paper/85">
              ANALYTICS & SYSTEMS
            </div>
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-teal-400">
              PROGRAMMING
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl font-accent text-signal rotate-[4deg] mt-3">
              and Innovation
            </div>
          </div>
        </div>
      </section>

      {/* Blob transition from dark indigo focus domains to paper cream committee */}
      <BlobDivider fillClass="fill-paper" bgClass="bg-indigo" />

      {/* 6. EXECUTIVE COMMITTEE PREVIEW */}
      <section className="py-20 px-6 bg-paper/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="04 / LEADERSHIP" heading="Our Leadership" className="mb-0" />
            <Button to="/committee" variant="secondary">
              View Full Committee
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-6">
            {/* Advisor (featured, spans 2 columns) */}
            <ScrollReveal className="md:col-span-2" delay={0.1}>
              <TeamCard member={facultyMember} featured={true} tiltAngle={-2} />
            </ScrollReveal>
            
            {/* Core Executive Board Students */}
            {featuredStudents.slice(0, 2).map((student, idx) => (
              <ScrollReveal key={student.id} delay={0.2 + idx * 0.1}>
                <TeamCard member={student} tiltAngle={idx % 2 === 0 ? 3 : -1.5} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. JOIN CTA SECTION */}
      <section className="py-24 px-6 bg-teal text-paper relative overflow-hidden border-t-[3px] border-ink">
        {/* Accent Annotation tag */}
        <span className="absolute bottom-16 left-[10%] font-accent text-3xl text-paper/90 rotate-[-12deg] select-none hidden md:block">
          Connect. Create. Grow.
        </span>

        <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase mb-4">
            {"// JOIN THE NETWORK"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 font-display text-paper max-w-2xl leading-none">
            Ready to shape the future of technology?
          </h2>
          <p className="font-body text-base md:text-lg text-paper/85 leading-relaxed mb-10 max-w-xl font-light">
            Become part of a growing community of innovators, developers, analysts, and creators shaping the future through data.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/contact" variant="primary">
              Join Us
            </Button>
            <Button to="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Scalloped divider between teal CTA block and deep indigo footer */}
      <BlobDivider fillClass="fill-indigo" bgClass="bg-teal" />

    </div>
  );
}
