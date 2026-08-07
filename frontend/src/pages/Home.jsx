import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu, Trophy, Globe, Users, Lightbulb, ArrowRight } from 'lucide-react';
import NodeCanvasBackground from '../components/NodeCanvasBackground';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';
import TeamCard from '../components/TeamCard';
import Button from '../components/Button';
import { committeeData } from '../data/committee';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  // Get featured members for preview (Faculty Coordinator + featured students)
  const facultyMember = committeeData.faculty;
  const featuredStudents = committeeData.core || [];

  const whatWeDoList = [
    {
      icon: Terminal,
      title: "Workshops & Bootcamps",
      description: "Hands-on, immersive training in Python, analytics frameworks, machine learning, and emerging technical stacks."
    },
    {
      icon: Cpu,
      title: "Project Incubation",
      description: "Transforming theoretical ideas into tangible applications. We provide mentorship and collaboration circles."
    },
    {
      icon: Trophy,
      title: "Hackathons & Competitions",
      description: "Hosting internal builds and training squads to compete in regional and national hackathons and coding tournaments."
    },
    {
      icon: Globe,
      title: "Industry Interaction",
      description: "Connecting students directly with tech leads, hosting expert sessions, and opening doors for project internships."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Fostering an open network of peers sharing code, discussing technical research, and learning collectively."
    },
    {
      icon: Lightbulb,
      title: "Research & Innovation",
      description: "Exploring scientific breakthroughs in Artificial Intelligence, Deep Learning, and quantitative data solutions."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-paper px-6">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] md:min-h-[110vh] flex items-center justify-center border-b border-indigo/10 px-6 py-16 md:py-20">
        <NodeCanvasBackground />

        {/* Asymmetrical grid background line indicators */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-indigo/5 hidden md:block"></div>
          <div className="absolute right-[25%] top-0 bottom-0 w-[1px] bg-indigo/5 hidden md:block"></div>
          <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-indigo/5"></div>
          <div className="absolute left-[15%] top-[30%] text-indigo/25 text-xs font-heading translate-x-2 translate-y-2 hidden md:block">
            LAT_00.26_N
          </div>
          <div className="absolute right-[25%] top-[30%] text-indigo/25 text-xs font-heading translate-x-2 -translate-y-4 hidden md:block">
            + CORNER_GRID_REF
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto w-full z-10 flex flex-col items-center justify-center text-center">
          <ScrollReveal className="flex flex-col items-center justify-center text-center" delay={0.1}>
            {/* Tagline Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-indigo/15 bg-paper/60 backdrop-blur-sm mb-8 font-heading text-xs text-teal font-bold tracking-widest uppercase rounded-full select-none">
              <span className="w-1.5 h-1.5 bg-signal animate-ping rounded-full shrink-0"></span>
              <span>CONNECTING THE DOTS. CREATING THE DELTA.</span>
            </div>

            {/* Custom DELTA Logo Typography Logo (▶ELT▲) */}
            <h1 className="flex items-center justify-center gap-[0.05em] text-7xl md:text-[8rem] lg:text-[10rem] font-bold text-indigo leading-none tracking-tight mb-8 w-full select-none">
              <svg viewBox="0 0 100 100" className="h-[0.82em] w-auto text-indigo shrink-0" fill="currentColor">
                <path fillRule="evenodd" d="M 20 10 L 80 45 C 85 48, 85 52, 80 55 L 20 90 C 15 93, 10 90, 10 83 L 10 17 C 10 10, 15 7, 20 10 Z M 32 37 L 58 50 L 32 63 Z" />
              </svg>
              <span className="font-heading">E</span>
              <span className="font-heading">L</span>
              <span className="font-heading">T</span>
              <svg viewBox="0 0 100 100" className="h-[0.82em] w-auto text-indigo shrink-0" fill="currentColor">
                <path fillRule="evenodd" d="M 50 12 C 54 12, 57 16, 59 20 L 92 78 C 95 83, 93 90, 87 90 L 13 90 C 7 90, 5 83, 8 78 L 41 20 C 43 16, 46 12, 50 12 Z M 50 45 L 65 72 L 35 72 Z" />
              </svg>
            </h1>

            <p className="font-body text-base md:text-lg text-ink/80 max-w-3xl leading-normal mb-10 mx-auto tracking-tight">
              DELTA (Data Oriented Thinkers' Association) is the student-led Data Science and Emerging Technology association at Christ College of Engineering, Thrissur. We bridge standard curriculum with dynamic industrial engineering to create real-world impact.
            </p>

            <div className="flex justify-center">
              <Link
                to="/about"
                className="group inline-flex items-center bg-indigo border border-indigo/20 pl-8 pr-2 py-2 rounded-lg hover:shadow-[0_15px_30px_rgba(14,48,97,0.22)] transition-all duration-300 select-none active:scale-[0.98]"
              >
                <span className="font-heading text-sm font-light text-paper tracking-normal uppercase mr-6">
                  Explore DELTA
                </span>
                <div className="flex items-center justify-center w-10 h-10 bg-signal text-paper rounded-lg group-hover:bg-/90 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 transform -rotate-45 transition-transform duration-1000 group-hover:rotate-[315deg]" />
                </div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-12 md:py-24 px-6 border-b border-indigo/10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ScrollReveal className="lg:col-span-4">
          <SectionHeading eyebrow="01 / ORIGIN" heading="About DELTA" />
        </ScrollReveal>
        <ScrollReveal className="lg:col-span-8 flex flex-col justify-between" delay={0.15}>
          <div>
            <h3 className="font-heading text-xl font-bold text-indigo uppercase mb-6 tracking-wide leading-snug">
              Bridging academic limits with active technical creation.
            </h3>
            <p className="font-body text-base text-ink/85 leading-relaxed mb-6 tracking-tight">
              DELTA was formed in the Department of Computer Science & Engineering (Data Science) to foster a community of creators, analysts, and analytical thinkers. We emphasize research-informed coding and open collaboration.
            </p>
            <p className="font-body text-base text-ink/70 leading-relaxed mb-8 tracking-tight">
              Through peer mentorship, workshops, hackathons, and research projects, we invite students to develop the critical capacities required to navigate the future data landscape.
            </p>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-signal hover:text-indigo transition-colors duration-300 group">
            LEARN MORE ABOUT DELTA
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="py-12 md:py-24 px-6 bg-paper/50 border-b border-indigo/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="02 / BLUEPRINT" heading="Mission & Vision" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
            <ScrollReveal delay={0.1} className="h-full">
              <Card
                title="Our Mission"
                description="To provide students with collaborative spaces, resources, and technical support to learn, build, and deploy data systems and Artificial Intelligence solutions."
                className="min-h-[260px]"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="h-full">
              <Card
                title="Our Vision"
                description="To construct a premier student research ecosystem at CCE recognized for computational excellence, creativity, and ethical design in emerging technology."
                className="min-h-[260px]"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="h-full">
              <Card
                title="Core Values"
                description="Built on three fundamental guidelines: Analytical Rigor in problem-solving, Creative Thinking in architectural design, and Collective Growth across our community."
                className="min-h-[260px]"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION */}
      <section className="py-12 md:py-24 px-6 border-b border-indigo/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="03 / FOCUS" heading="What We Do" className="mb-0" />
            <p className="font-body text-sm text-ink/75 max-w-md leading-relaxed tracking-tight">
              DELTA operates as an active hub, deploying programs that build technical competence and peer network resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 items-stretch">
            {whatWeDoList.map((item, idx) => (
              <ScrollReveal key={idx} delay={(idx % 3) * 0.1} className="h-full">
                <Card
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  iconPosition="top-right"
                  className="min-h-[260px]"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE COMMITTEE PREVIEW */}
      <section className="py-12 md:py-24 px-6 bg-paper/50 border-b border-indigo/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="04 / LEADERSHIP" heading="Our Leadership" className="mb-0" />
            <Button to="/committee" variant="secondary">
              View Full Committee
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Featured Faculty */}
            <ScrollReveal className="md:col-span-2" delay={0.1}>
              <TeamCard member={facultyMember} featured={true} />
            </ScrollReveal>

            {/* Featured Students */}
            {featuredStudents.slice(0, 2).map((student, idx) => (
              <ScrollReveal key={student.id} delay={0.2 + idx * 0.1}>
                <TeamCard member={student} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOIN CTA SECTION */}
      <section className="py-12 md:py-20 px-6 relative overflow-hidden bg-indigo text-paper rounded-3xl mb-10 md:mb-24">
        {/* Asymmetrical Blueprint Crosshairs */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-[20%] left-[10%]">+</div>
          <div className="absolute bottom-[20%] right-[10%]">+</div>
          <div className="absolute top-[50%] right-[30%]">GRID_SYNC_0.8</div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <span className="font-heading text-xs text-signal font-bold tracking-[0.25em] uppercase mb-4">
            {"// JOIN THE NETWORK"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-6 font-heading text-paper max-w-2xl leading-none">
            Ready to shape the future of technology?
          </h2>
          <p className="font-body text-base md:text-lg text-paper/80 leading-relaxed mb-10 max-w-xl tracking-tight">
            Become part of a growing community of innovators, developers, analysts, and creators shaping the future through data.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/contact" className="border-signal bg-signal hover:bg-transparent hover:text-signal text-paper">
              Join Us
            </Button>
            <Button to="/contact" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-indigo">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
