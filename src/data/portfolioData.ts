import { BentoCard, ExperienceItem, ArchitectureItem, SkillItem } from '../types/portfolio';

export const SYSTEM_INFO = {
  user: 'ruchir',
  host: 'enterprise-arch',
  os: 'RuchirOS Enterprise Linux x86_64',
  node: 'Distributed Systems Node',
  kernel: '6.8.0-enterprise-lts',
  uptime: '5+ Years (Production Grade)',
  concurrency: '500+ WebSocket Nodes',
  qaOverhead: '-70% (OpenAI Automation)',
  response: '-60% Latency Acceleration',
  stack: 'Node.js, MSSQL, React, Redis',
  role: 'Senior Software Engineer & Distributed Systems Architect',
  company: 'Accenture',
  resumeFile: 'assets/RuchirGupta-SoftwareEngineer.pdf',
  githubUrl: 'https://github.com/rchrx',
  linkedinUrl: 'https://www.linkedin.com/in/rchrx',
  mediumUrl: 'https://medium.com/@rchrx',
  vscoUrl: 'https://vsco.co/rchrx',
};

export const BENTO_CARDS: BentoCard[] = [
  {
    id: 'bento-1',
    tag: 'DISTRIBUTED BACKEND',
    title: 'High-Throughput Microservices & Databases',
    description: 'Architecting resilient Node.js services and robust SQL schemas designed to handle enterprise workloads. Optimized for sub-second query latency, connection pooling, and linear horizontal scalability.',
    path: '~/core/distributed_backend.js',
    meta: 'node.js',
    span2: true,
    pills: ['Node.js', 'Express', 'MS SQL', 'PostgreSQL', 'RESTful APIs']
  },
  {
    id: 'bento-2',
    tag: 'EVENT-DRIVEN',
    title: 'Real-Time WebSocket Portals',
    description: 'Low-latency bidirectional communication pipelines and automated scheduling daemons coordinating 500+ live users seamlessly with zero race conditions.',
    path: '~/daemons/websocket_portal.rs',
    meta: 'events',
    span2: false,
    pills: ['WebSockets', 'Cron Daemons', 'Pub/Sub']
  },
  {
    id: 'bento-3',
    tag: 'APPLIED INTELLIGENCE',
    title: 'Enterprise AI Workflows',
    description: 'Integrating Azure OpenAI and OpenAI APIs into mission-critical pipelines: automated customer support auditing, conversational Teams voice bots, and automated ticket triage.',
    path: '~/ai/openai_pipeline.py',
    meta: 'llm',
    span2: false,
    pills: ['Azure OpenAI', 'LLM Triage', 'Voice Assistants']
  },
  {
    id: 'bento-4',
    tag: 'FULL STACK EXCELLENCE',
    title: 'High-Velocity Frontend Architecture',
    description: 'Spearheaded modern React and Redux architectures for 25-engineer dev teams. Delivered 55% implementation efficiency improvements, 60% UI performance accelerations, and comprehensive observability with DataDog and Sentry.',
    path: '~/ui/react_telemetry.tsx',
    meta: 'frontend',
    span2: true,
    pills: ['React.js', 'Redux', 'TypeScript', 'DataDog', 'Sentry']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-accenture',
    path: '~/career/accenture_backend.sh',
    pid: 'PID: 1024 • ACTIVE',
    isActive: true,
    title: 'Senior Software Engineer • Backend Developer',
    company: 'Accenture',
    timeframe: '12/2024 — Present',
    lead: 'Designing and deploying enterprise backend systems and AI-driven automation workflows with Node.js, Express, MS SQL, and Azure OpenAI to streamline support operations and workforce scheduling.',
    highlights: [
      {
        title: 'Automated Chat Auditing Engine:',
        text: 'Built an automated QA audit pipeline for support chats with Node.js, OpenAI API, Bing Spell Check API, and MS SQL — reducing manual QA efforts by ~70%.'
      },
      {
        title: 'Real-Time Break Management Portal:',
        text: 'Designed real-time backend services using WebSockets, Express, MS SQL, and cron jobs — reducing scheduling conflicts by 40% for 500+ concurrent agents.'
      },
      {
        title: 'AI Rapid Response Resolution Engine:',
        text: 'Built an intelligent ticket resolution system via Azure OpenAI & MS SQL — reducing first-response time by 60% and auto-resolving ~35% of repetitive support tickets.'
      },
      {
        title: 'Voice-Enabled Teams Bot:',
        text: 'Developed a voice-enabled Microsoft Teams bot with Node.js & Azure OpenAI to automate internal enterprise IT support triage.'
      }
    ],
    tags: ['Node.js', 'Azure OpenAI', 'WebSockets', 'MS SQL', 'Bing API', 'Cron Daemons']
  },
  {
    id: 'exp-evsoftware',
    path: '~/career/ev_software.sh',
    pid: 'PID: 0822 • COMPLETED',
    isActive: false,
    title: 'Software Engineer • Full Stack Developer',
    company: 'EV Software Solutions Pvt Ltd',
    timeframe: '08/2022 — 12/2024',
    lead: 'Spearheaded frontend and full stack architecture for customer-facing web applications, improving team development velocity and optimizing user experience performance.',
    highlights: [
      {
        title: 'Team Development Velocity:',
        text: 'Accelerated team implementation efficiency by 55% using standardized React.js architecture for a dev team of 25 engineers.'
      },
      {
        title: 'Flagship Web Application:',
        text: 'Led development of a large-scale customer web application that achieved a 45% increase in user engagement with React JS and Redux.'
      },
      {
        title: 'Performance & Latency Optimization:',
        text: 'Improved UI performance by 60% and reduced loading times by up to 40% via Context API, custom hooks, and lifecycle tuning.'
      },
      {
        title: 'Observability & Testing:',
        text: 'Integrated DataDog & Sentry telemetry and initiated E2E test suites, catching 40% upfront defects prior to staging.'
      }
    ],
    tags: ['React.js', 'Redux', 'TypeScript', 'DataDog', 'Sentry', 'RBAC Security']
  },
  {
    id: 'exp-ienergizer',
    path: '~/career/ienergizer_ops.sh',
    pid: 'PID: 0920 • COMPLETED',
    isActive: false,
    title: 'CS Executive • Operations & Systems',
    company: 'iEnergizer Services Pvt Ltd',
    timeframe: '09/2020 — 08/2022',
    lead: 'Provided live online operations, player technical support, and collaborated directly with core development teams on game quests, storylines, and asset UI integration.',
    highlights: [
      {
        title: 'Systems & Quests Collaboration:',
        text: 'Partnered with devs to design engaging quest lines, storylines, and in-game dialogue balance.'
      },
      {
        title: 'UI & Visual Consistency:',
        text: 'Assisted developers with asset integration, visual consistency checks, and balance improvements based on live player feedback.'
      }
    ],
    tags: ['Game Operations', 'UI Asset Integration', 'Player Experience', 'Feedback Telemetry']
  }
];

export const ARCHITECTURE_SHOWCASE: ArchitectureItem[] = [
  {
    id: 'arch-chat-sentinel',
    path: '~/systems/chat_sentinel.py',
    meta: 'ai',
    category: 'AI • AUTOMATION',
    title: 'Chat Sentinel: Support Audit Engine',
    description: 'Enterprise auditing engine analyzing customer support transcripts at scale. Combines OpenAI API, Bing Spell Check, and MS SQL pipelines to score agent interactions, identify compliance anomalies, and deliver automated QA analytics.',
    metrics: [
      { val: '-70%', lbl: 'Manual QA Overhead' },
      { val: '100%', lbl: 'Audit Coverage' }
    ],
    tech: ['Node.js', 'OpenAI API', 'Bing Spell Check', 'MS SQL']
  },
  {
    id: 'arch-syncshift',
    path: '~/systems/sync_shift.rs',
    meta: 'ws',
    category: 'REAL-TIME • WEBSOCKETS',
    title: 'SyncShift: Real-Time Workforce Portal',
    description: 'High-concurrency synchronization engine coordinating real-time agent break requests and team schedules. Utilizes persistent WebSockets, distributed SQL locking patterns, and automated cron jobs to eliminate scheduling collisions.',
    metrics: [
      { val: '500+', lbl: 'Concurrent Agents' },
      { val: '-40%', lbl: 'Schedule Collisions' }
    ],
    tech: ['Node.js', 'WebSockets', 'Express', 'Cron Engine']
  },
  {
    id: 'arch-apexresolve',
    path: '~/systems/apex_resolve.py',
    meta: 'llm',
    category: 'LLM • AZURE OPENAI',
    title: 'ApexResolve: Ticket Resolution Engine',
    description: 'Production AI triage service integrating Azure OpenAI with backend ticket databases. Parses incoming enterprise support tickets, extracts intent/entities, searches knowledge vectors, and resolves repetitive tier-1 issues autonomously.',
    metrics: [
      { val: '-60%', lbl: 'First Response Time' },
      { val: '~35%', lbl: 'Auto-Resolved' }
    ],
    tech: ['Azure OpenAI', 'Node.js', 'MS SQL', 'Vector Context']
  },
  {
    id: 'arch-teams-voice',
    path: '~/systems/teams_voice.ts',
    meta: 'voice',
    category: 'CONVERSATIONAL AI',
    title: 'Teams VoiceBot: Enterprise IT Assistant',
    description: 'Voice-enabled Microsoft Teams bot streamlining company-wide IT support workflows. Enables employees to query system statuses, initiate password resets, and provision access through natural voice conversations.',
    metrics: [
      { val: '24/7', lbl: 'Autonomous Support' },
      { val: 'Instant', lbl: 'Voice Triage' }
    ],
    tech: ['MS Teams SDK', 'Node.js', 'Azure Cognitive', 'OpenAI']
  },
  {
    id: 'arch-omniportal',
    path: '~/systems/omni_portal.tsx',
    meta: 'ui',
    category: 'FRONTEND • SCALE',
    title: 'OmniPortal: Customer-Facing Platform',
    description: 'Large-scale customer portal engineered with React, Redux, and modern modular architecture. Features granular RBAC permissions, sub-second route transitions, and full observability with DataDog and Sentry.',
    metrics: [
      { val: '+45%', lbl: 'Engagement Lift' },
      { val: '+60%', lbl: 'UI Speed' }
    ],
    tech: ['React.js', 'Redux', 'TypeScript', 'DataDog']
  },
  {
    id: 'arch-tesseract',
    path: '~/gfx/matrix_tesseract.glsl',
    meta: 'webgl',
    category: 'CREATIVE CODE • THREE.JS',
    title: 'Cyber Tesseract: 3D Hologram',
    description: 'Hardware-accelerated Three.js WebGL canvas featuring a rotating geometric cyber tesseract wireframe, phosphor matrix particle streams, fluid mouse easing, and a native Linux Terminal CLI HUD.',
    metrics: [
      { val: '60 FPS', lbl: 'Smooth Motion' },
      { val: 'Zero', lbl: 'Dependencies' }
    ],
    tech: ['Three.js', 'WebGL', 'CSS 3D', 'Web Audio']
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // Backend
  { name: 'Node.js', category: 'backend', badge: 'Advanced', level: 95, experience: '5+ Years Production Experience' },
  { name: 'Express.js', category: 'backend', badge: 'Advanced', level: 92, experience: '5+ Years Production Experience' },
  { name: 'MS SQL & PostgreSQL', category: 'backend', badge: 'Advanced', level: 90, experience: '4+ Years Database Architecture' },
  { name: 'WebSockets & Real-Time', category: 'backend', badge: 'Advanced', level: 88, experience: '3+ Years Low-Latency Sync' },
  { name: 'RESTful APIs & Microservices', category: 'backend', badge: 'Advanced', level: 95, experience: '5+ Years Distributed Design' },

  // AI / LLM
  { name: 'OpenAI API', category: 'ai', badge: 'Production', level: 90, experience: '2+ Years LLM Pipelines' },
  { name: 'Azure OpenAI Services', category: 'ai', badge: 'Production', level: 88, experience: '2+ Years Enterprise Deployment' },
  { name: 'Conversational & Voice Bots', category: 'ai', badge: 'Production', level: 85, experience: '2 Years MS Teams SDK' },
  { name: 'Automated QA & LLM Triage', category: 'ai', badge: 'Production', level: 92, experience: '2 Years Autonomous Auditing' },

  // Frontend
  { name: 'React.js & Redux', category: 'frontend', badge: 'Advanced', level: 92, experience: '4+ Years Component Systems' },
  { name: 'TypeScript', category: 'frontend', badge: 'Proficient', level: 86, experience: '3 Years Type-Safe Architecture' },
  { name: 'Next.js & Tailwind CSS', category: 'frontend', badge: 'Proficient', level: 88, experience: '3 Years Modern Web Apps' },

  // Cloud / DevOps
  { name: 'Docker & Containers', category: 'devops', badge: 'Proficient', level: 84, experience: '3 Years Containerization' },
  { name: 'Azure Cloud', category: 'devops', badge: 'Proficient', level: 86, experience: '3 Years Cloud Services' },
  { name: 'Git, GitHub & CI/CD', category: 'devops', badge: 'Advanced', level: 94, experience: '5+ Years Version Control & Pipelines' },
  { name: 'DataDog & Sentry', category: 'devops', badge: 'Proficient', level: 88, experience: '3 Years Telemetry & Error Monitoring' }
];
