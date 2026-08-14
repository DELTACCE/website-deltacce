/**
 * Database Seed & Credential Generator Script for AGENTIC AI PRODUCT BUILD SPRINT
 * Extracted and updated directly from the official Google Sheets project registry.
 * Runs via Node.js: node supabase/seed_agentic_ai.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const teamsData = [
  {
    teamNumber: 1,
    teamCode: 'TEAM01',
    teamName: 'LogicLoop',
    members: ['Jeniha', 'Ashmy', 'Ann Riya'],
    mentor: 'Anoop - 6235095205',
    password: 'CCE26@T01',
    problemStatement: 'Consumers often face issues such as overpricing, defective products, warranty refusal, counterfeit products, delayed refunds, and misleading product claims. Identifying applicable consumer laws, verifying product and purchase details, collecting evidence, and deciding the correct complaint or escalation process can be confusing and time-consuming. Existing solutions mainly provide static legal information rather than actively investigating and resolving a consumer\'s specific problem.',
    abstract: 'We propose an Agentic AI Consumer Protection Assistant that autonomously analyzes and assists with consumer disputes. Users securely authenticate and upload invoices, product images, warranty documents, or complaint details. Specialized agents perform OCR, product verification, legal research, and evidence analysis, while an orchestrator coordinates the process. The system identifies relevant laws, verifies information, suggests appropriate actions, generates complaint drafts, and recommends legal assistance when required. It maintains case history and provides a transparent action and source trail, helping users move from problem identification to actionable resolution.'
  },
  {
    teamNumber: 2,
    teamCode: 'TEAM02',
    teamName: 'MentoraX',
    members: ['Alan Jaison', 'Navaneeth K R', 'Irine Milton'],
    mentor: 'Neharin - 6282910107',
    password: 'CCE26@T02',
    problemStatement: 'Teachers spend significant time collecting, evaluating, and providing feedback on student assignments submitted in different formats such as PDFs, images, handwritten answers, and code. Manual grading, identifying learning gaps, communicating results, and following up on improvements are repetitive and difficult to scale.',
    abstract: 'We propose an Agentic AI Teacher Assistant that autonomously manages the complete assignment evaluation and feedback cycle. Student submissions are retrieved from Google Drive and processed using specialized agents for document/OCR, vision, and code analysis. An orchestrator coordinates rubric-based evaluation, marking, error detection, verification, and personalized feedback generation. A Gmail Agent automatically sends students their results, mistakes, improvement suggestions, and learning resources. Analytics identify common class-level weaknesses and students requiring additional support.'
  },
  {
    teamNumber: 3,
    teamCode: 'TEAM03',
    teamName: 'TriAgnets',
    members: ['Dilna', 'Rohan', 'Christy'],
    mentor: 'Minhaj - 9946779672',
    password: 'CCE26@T03',
    problemStatement: 'Online learning platforms give every student the same static learning path. When a student repeatedly fails a topic, the system just shows a low score. It doesn\'t diagnose the real cause of the gap, adapt its teaching method, retest, or update the study plan. Students keep repeating mistakes with no system reasoning about why they\'re struggling.',
    abstract: 'We propose an agentic AI-powered personalized learning system that acts as an autonomous study mentor. Instead of a single chatbot, specialized AI agents — Diagnostic, Tutor, Assessment, and Planner — work together under an Orchestrator to identify a student\'s exact knowledge gap, re-teach it differently, retest understanding, and continuously update the study plan. This creates a closed-loop, adaptive learning experience that mirrors a real human tutor, rather than just tracking scores.'
  },
  {
    teamNumber: 4,
    teamCode: 'TEAM04',
    teamName: 'InternX',
    members: ['Jeffin', 'Trimil', 'Vimal'],
    mentor: 'Sreehari - 9778472914',
    password: 'CCE26@T04',
    problemStatement: 'College students struggle to find suitable internships because opportunities are scattered across multiple platforms, making it difficult to check eligibility, match skills, track deadlines, and manage applications efficiently. InternX aims to solve this problem through an autonomous AI agent that understands a student’s profile and career goals, discovers relevant internships, verifies eligibility, ranks the best opportunities, assists in preparing personalized applications, and tracks their application status.',
    abstract: 'InternX is an autonomous AI-powered internship agent designed to simplify and personalize the internship search process for college students. The system analyzes a student’s profile, skills, education, and career interests to discover relevant internship opportunities from external sources. It automatically checks eligibility, evaluates skill compatibility, ranks suitable opportunities, assists in preparing personalized applications, and maintains application status. By combining AI-based decision-making, external tools, and persistent memory, InternX reduces the time and effort required.'
  },
  {
    teamNumber: 5,
    teamCode: 'TEAM05',
    teamName: 'CityFix',
    members: ['Jackson M.S', 'Abel Xavi', 'Milan'],
    mentor: 'Aleena - 9447685759',
    password: 'CCE26@T05',
    problemStatement: 'Citizens struggle to report civic issues like potholes, garbage, and water leaks due to fragmented systems, unclear authorities, and poor tracking, leading to delays and lack of transparency. CityFix AI solves this with a single intelligent platform that automates complaint routing, tracking, and resolution.',
    abstract: 'CityFix AI is an agentic AI-powered civic issue resolution platform that helps citizens report, track, and manage civic complaints through a single intelligent interface. Users can describe issues such as potholes, broken streetlights, garbage accumulation, or water leaks in natural language. The agent autonomously plans and executes a multi-step resolution workflow by analyzing the complaint, identifying its category and location, checking for existing complaints, determining the responsible department, and creating or routing the case.'
  },
  {
    teamNumber: 6,
    teamCode: 'TEAM06',
    teamName: 'CivicExperts',
    members: ['Merin Joy', 'Sijil', 'Aibel'],
    mentor: 'Hari Krishna - 8304919727',
    password: 'CCE26@T06',
    problemStatement: 'Thousands of government welfare schemes exist, but citizens often struggle to identify which ones actually apply to their situation. Finding the right scheme requires navigating scattered government portals, interpreting dense eligibility guidelines, and understanding administrative terminology. Even when a citizen finds a relevant scheme, being eligible does not necessarily mean being ready to apply.',
    abstract: 'CivicPilot is an autonomous welfare-navigation agent that goes beyond scheme discovery and eligibility prediction to determine a citizen\'s actual application readiness. Given a citizen\'s situation in plain language, it autonomously discovers relevant schemes from authoritative government sources and verifies each eligibility criterion against the available information. It creates an Eligibility Evidence Matrix, mapping every criterion to supporting citizen information and its government source.'
  },
  {
    teamNumber: 7,
    teamCode: 'TEAM07',
    teamName: 'Lunatic Bytes',
    members: ['Abhinand', 'Adarsh', 'Adithya K B'],
    mentor: 'Alvi - 8589837817',
    password: 'CCE26@T07',
    problemStatement: 'Uncoordinated Disaster Response in Data-Poor Environments. Current state: Resource allocation (emergency supplies, evacuation routes, personnel deployment) is reactive and fragmented. 80% of rural areas lack real-time monitoring. Siloed data sources fail to communicate, analysts face manual bottlenecks, and current systems lack predictive capabilities.',
    abstract: 'An agentic AI system that autonomously fuses multi-source geospatial data (weather APIs, open street maps, elevation, satellite imagery) and makes real-time decisions without human intervention. Five independent agents coordinate to detect rainfall anomalies, compute hyper-local risk scores, optimize resource routing, and send alerts within 5–10 minutes using Groq API tool-use.'
  },
  {
    teamNumber: 8,
    teamCode: 'TEAM08',
    teamName: 'LabTwin AI',
    members: ['Parvathy', 'Jomon JoJo', 'Francis'],
    mentor: 'Nizma - 9995924361',
    password: 'CCE26@T08',
    problemStatement: 'Programming lab students often memorize programs without understanding the concepts behind them. Existing coding assistants may detect errors or generate solutions, but they usually do not track recurring misconceptions, verify whether the student has actually corrected them, or evaluate practical lab readiness through repeated coding and viva-based testing.',
    abstract: 'LabTwin AI is an autonomous programming lab coach that helps students move from program memorization to actual coding understanding. The system analyzes submitted code, executes it against test cases, identifies conceptual and coding mistakes, and stores recurring misconceptions in a personalized learning profile. Based on these weaknesses, it generates targeted coding problems, provides progressive hints, conducts code-based viva questions, and retests the same concepts.'
  },
  {
    teamNumber: 9,
    teamCode: 'TEAM09',
    teamName: 'EduCrew',
    members: ['Dijo Joshi', 'Freya', 'Alexto Jose'],
    mentor: 'Nesla - 9744843981',
    password: 'CCE26@T09',
    problemStatement: 'Despite the rapid adoption of AI in education, current platforms rely almost entirely on passive Retrieval-Augmented Generation (RAG) that functions merely as interactive document readers rather than actual tutors. Traditional AI study tools cannot dynamically evaluate a student’s true comprehension through live code or answer execution, leaving students with an illusion of competence.',
    abstract: 'EduCrew is an agentic AI learning system that bridges the execution gap in education by transforming passive study materials into interactive, verified learning environments. Multi-agent teams dynamically evaluate comprehension, conduct live code verification, remediate knowledge gaps, and track stateful mastery for each student.'
  },
  {
    teamNumber: 10,
    teamCode: 'TEAM10',
    teamName: 'YojanaSeek',
    members: ['Kishan', 'Aneena', 'Abhinav'],
    mentor: 'John Antony - 9633768464',
    password: 'CCE26@T10',
    problemStatement: 'Government schemes exist to help citizens with education, financial aid, and healthcare. However, people miss out on these benefits because finding the right schemes is confusing. Citizens have to manually read through complex rules, income cutoffs, age limits, and long lists of required documents scattered across different websites.',
    abstract: 'Navigating government welfare schemes is complex, causing millions of citizens to miss out on financial, educational, and social benefits due to fragmented eligibility rules and document requirements. To bridge this gap, we present an autonomous multi-agent civic tech system that streamlines scheme discovery and application readiness end-to-end using a four-step workflow: Profile Analysis, Scheme Retrieval, Eligibility Verification, and Document Audit & Delivery.'
  },
  {
    teamNumber: 11,
    teamCode: 'TEAM11',
    teamName: 'CoreMind',
    members: ['Sneha T Shine', 'Raphael', 'Godwin'],
    mentor: 'Abel Babu - 8160192818',
    password: 'CCE26@T11',
    problemStatement: 'People often have important long-term goals—such as studying abroad, starting a business, preparing for an exam, or planning a major career move—but struggle to convert these goals into consistent actions. Existing productivity and AI tools generally provide static plans, reminders, or answers, requiring users to manually research information and organize tasks.',
    abstract: 'LifeOS is an AI-powered autonomous agent designed to help users achieve complex, long-term goals by transforming them into actionable plans and continuously managing their progress. Unlike traditional AI assistants that mainly provide information, LifeOS can plan, execute, monitor, and adapt tasks using external tools and services, acting as a personal autonomous operations manager.'
  },
  {
    teamNumber: 12,
    teamCode: 'TEAM12',
    teamName: 'Team 12',
    members: ['Johan Mathew Santhosh', 'Maria Rose Augustine', 'Sangeetha Sundaran'],
    mentor: 'George - 9400520933',
    password: 'CCE26@T12',
    problemStatement: 'Autonomous Agentic AI solution development in progress for product build sprint.',
    abstract: 'Project abstract and implementation workflow undergoing final team evaluation.'
  }
];

function generateSeed() {
  const seedOutput = {
    event: {
      name: 'AGENTIC AI PRODUCT BUILD SPRINT',
      slug: 'agentic-ai-product-build-sprint',
      department: 'Department of Computer Science and Engineering (Data Science)',
      venue: 'Christ College of Engineering (Autonomous), Irinjalakuda',
      startDate: '2026-08-08',
      endDate: '2026-08-17',
      submissionDeadline: '2026-08-17T23:59:59+05:30',
      driveFolderUrl: 'https://drive.google.com/drive/folders/1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd?usp=drive_link',
      driveFolderId: '1zkH7ebuW29DMVRc1MugXM0WJt63rR4Wd'
    },
    teams: teamsData,
    adminCredentials: {
      username: 'AIPS-ADMIN',
      password: 'AIPS-ADMIN-LQ65Tt5J'
    }
  };

  const jsonPath = path.join(__dirname, '../frontend/src/data/seedData.json');
  fs.writeFileSync(jsonPath, JSON.stringify(seedOutput, null, 2));

  console.log('=== SEED FILE GENERATION COMPLETE ===');
  console.log('Participant and Admin seed file written to:', jsonPath);

  // Automatically sync with live Supabase tables (teams, problem_statements, participants, mentors)
  try {
    const { seedLiveDatabase } = require('./seed_supabase_auth');
    seedLiveDatabase();
  } catch (err) {
    console.warn('Note: Live Supabase database sync failed:', err.message);
  }

  return seedOutput;
}

if (require.main === module) {
  generateSeed();
}

module.exports = { generateSeed };
