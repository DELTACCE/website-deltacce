import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Cpu, Trophy, Globe, Users, Lightbulb, ArrowRight } from 'lucide-react';
import NodeCanvasBackground from '../components/NodeCanvasBackground';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';
import TeamCard from '../components/TeamCard';
import Button from '../components/Button';
import { committeeData } from '../data/committee';

export default function Home() {
  // Get featured members for preview (Faculty Coordinator + featured students)
  const facultyMember = committeeData.faculty;
  const featuredStudents = committeeData.students.filter(m => m.featured).slice(0, 4);

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
    <div className="relative overflow-hidden bg-paper">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center border-b border-indigo/10 px-6 py-20">
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

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            {/* Tagline Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-indigo/15 bg-paper/60 backdrop-blur-sm self-start mb-6 font-heading text-xs text-teal font-bold tracking-widest uppercase">
              <span className="w-2 h-2 bg-signal animate-ping rounded-full shrink-0"></span>
              <span>CONNECTING THE DOTS. CREATING THE DELTA.</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-indigo uppercase leading-[0.95] tracking-tight mb-6">
              Data Driven.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo to-teal">Thought Led.</span>
            </h1>
            
            <p className="font-body text-base md:text-lg text-ink/80 max-w-2xl leading-relaxed mb-10">
              DELTA is the student-led Data Science and Emerging Technology association at Christ College of Engineering, Thrissur. We bridge standard curriculum with dynamic industrial engineering to create real-world impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button to="/committee" variant="primary">
                Meet the Team
              </Button>
              <Button to="/about" variant="secondary">
                Explore DELTA
              </Button>
            </div>
          </div>
          
          {/* Asymmetric blueprint box bleeding off */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center select-none">
            <div className="relative w-80 h-80 border border-dashed border-indigo/20 flex items-center justify-center p-8 bg-paper/20 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-signal"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-signal"></div>
              <span className="text-[12rem] font-bold font-heading text-indigo/10 select-none">δ</span>
              <div className="absolute bottom-6 right-6 font-heading text-xs text-indigo/40 leading-none text-right">
                SYS_ACTIVE_2026<br />
                <span className="text-signal">DOT_COUNT: 60</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-24 px-6 border-b border-indigo/10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="01 / ORIGIN" heading="About DELTA" />
        </div>
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-indigo uppercase mb-6 tracking-wide leading-snug">
              Bridging academic limits with active technical creation.
            </h3>
            <p className="font-body text-base text-ink/85 leading-relaxed mb-6">
              DELTA was formed in the Department of Computer Science & Engineering (Data Science) to foster a community of creators, analysts, and analytical thinkers. We emphasize research-informed coding and open collaboration.
            </p>
            <p className="font-body text-base text-ink/70 leading-relaxed mb-8">
              Through peer mentorship, workshops, hackathons, and research projects, we invite students to develop the critical capacities required to navigate the future data landscape.
            </p>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-signal hover:text-indigo transition-colors duration-300 group">
            LEARN MORE ABOUT DELTA 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="py-24 px-6 bg-paper/50 border-b border-indigo/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="02 / BLUEPRINT" heading="Mission & Vision" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card
              title="Our Mission"
              description="To provide students with collaborative spaces, resources, and technical support to learn, build, and deploy data systems and Artificial Intelligence solutions."
            />
            <Card
              title="Our Vision"
              description="To construct a premier student research ecosystem at CCE recognized for computational excellence, creativity, and ethical design in emerging technology."
            />
            <Card
              title="Core Values"
              description="Built on three fundamental guidelines: Analytical Rigor in problem-solving, Creative Thinking in architectural design, and Collective Growth across our community."
            />
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION */}
      <section className="py-24 px-6 border-b border-indigo/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="03 / FOCUS" heading="What We Do" className="mb-0" />
            <p className="font-body text-sm text-ink/75 max-w-md leading-relaxed">
              DELTA operates as an active hub, deploying programs that build technical competence and peer network resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {whatWeDoList.map((item, idx) => (
              <Card
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                iconPosition="top-right"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE COMMITTEE PREVIEW */}
      <section className="py-24 px-6 bg-paper/50 border-b border-indigo/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <SectionHeading eyebrow="04 / LEADERSHIP" heading="Our Leadership" className="mb-0" />
            <Button to="/committee" variant="secondary">
              View Full Committee
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Featured Faculty */}
            <div className="md:col-span-2">
              <TeamCard member={facultyMember} featured={true} />
            </div>
            
            {/* Featured Students */}
            {featuredStudents.slice(0, 2).map((student) => (
              <TeamCard key={student.id} member={student} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOIN CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-indigo text-paper">
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
          <p className="font-body text-base md:text-lg text-paper/80 leading-relaxed mb-10 max-w-xl">
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
