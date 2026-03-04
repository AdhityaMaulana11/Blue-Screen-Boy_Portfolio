export interface Project {
  id: string;
  title: string;
  year: number;
  summary: string;
  screenshots: string[];
  tech: string[];
  role: string;
  duration: string;
  live?: string;
  repo?: string;
  problem: string;
  approach: string;
  result: string;
}

export const personalInfo = {
  name: "Adhitya Maulana Wijaya",
  alias: "Blue Screen Boy",
  tagline:
    "Undergraduate Student at Universitas Kuningan & Full-stack Developer",
  bio: "Full-Stack Developer with hands-on experience in building scalable web applications, SaaS prototypes, and automation systems. Proven track record in developing production-ready platforms using React.js, Next.js, Express.js, and modern frontend ecosystems, while also engineering browser automation tools and testing frameworks to optimize workflows and system reliability.",
  email: "adhityamaulanawijaya11@gmail.com",
  github: "https://github.com/AdhityaMaulana11",
  linkedin: "https://www.linkedin.com/in/adhitya-maulana-wijaya-b11534292/",
  location: "Kuningan, West Java, Indonesia",
};

export const education = [
  {
    degree: "S1 - Teknik Informatika",
    school: "Universitas Kuningan",
    year: "Sep 2023 - Present",
    description: "Focus on Software Engineering and Web Development",
  },
];

export const career = [
  {
    title: "Backend Developer",
    company:
      "The Association of Indonesian Scholars of English Education (AISEE)",
    period: "Dec 2025 - Present",
    description:
      "Built a full-stack web platform with React.js and Express.js, implemented JWT authentication, OJS 3 integration, and optimized database queries with Sequelize ORM.",
  },
  {
    title: "Academy Code Reviewer",
    company: "Dicoding",
    period: "Feb 2024 - Apr 2024",
    description:
      "Reviewed Dicoding Academy student projects, created evaluation rubrics, facilitated React & frontend workshops, and improved code quality and participant satisfaction.",
  },
  {
    title: "Freelance Software Developer",
    company: "Self-employed",
    period: "Mar 2023 - Present",
    description:
      "Worked on various web and automation projects for clients, building custom solutions with modern technologies.",
  },
];

export const skills = [
  { name: "JavaScript (ES6+)", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Kotlin", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "ShadcnUI", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "RESTful API", category: "Backend" },
  { name: "JWT Auth", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "Sequelize ORM", category: "Database" },
  { name: "Selenium WebDriver", category: "Automation" },
  { name: "Chrome Extension (MV3)", category: "Automation" },
  { name: "DOM Manipulation", category: "Automation" },
  { name: "Git", category: "Tools" },
  { name: "Android SDK", category: "Mobile" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Recharts", category: "Frontend" },
];

export const certifications = [
  "Junior Web Developer — Vocational School Graduate Academy Digital Talent Scholarship 2024",
  "Dicoding Intermediate Front-End Web",
  "Analyze Speech and Language with Google APIs",
  "Analyze Sentiment with Natural Language API",
  "Alibaba Cloud Developer Certification",
];

export const achievements = [
  "🥇 1st Place — Creative Video Content Competition, GENBI UNIKU, 2025",
  "🥈 2nd Place — Academic Quiz Competition, OIM UNIKU, 2025",
  "🥉 3rd Place — PKM-PM Proposal Competition, OIM UNIKU, 2024",
];

export const projects: Project[] = [
  {
    id: "cms-aisee",
    title: "CMS Website for AISEE",
    year: 2025,
    summary:
      "Full-stack web platform serving as the official digital portal for the AISEE organization. Centralized information management, membership, news publishing, and academic journal integration via OJS 3.",
    screenshots: [],
    tech: [
      "React.js",
      "Express.js",
      "Tailwind CSS",
      "Sequelize ORM",
      "MySQL",
      "JWT",
      "OJS 3",
    ],
    role: "Backend Developer",
    duration: "Ongoing",
    problem:
      "The organization needed a centralized digital platform for information management, membership, and journal publishing.",
    approach:
      "Built a full-stack platform with RESTful API architecture, JWT authentication, and Open Journal Systems (OJS 3) integration. Frontend uses React.js + Tailwind CSS, backend Express.js + Sequelize ORM + MySQL.",
    result:
      "Increased user engagement by 30%, reduced unauthorized access by 50%, and improved journal publishing efficiency by 40%.",
    repo: "",
  },
  {
    id: "solusikos",
    title: "SolusiKos — SaaS Prototype",
    year: 2026,
    summary:
      "High-fidelity marketplace prototype for boarding houses inspired by Mamikos, built for the P2MW competition. Supports 3 interactive roles: Tenant, Owner, and Service Provider.",
    screenshots: [],
    tech: ["Next.js", "TypeScript", "ShadcnUI", "Recharts", "Framer Motion"],
    role: "Full-Stack Developer",
    duration: "P2MW Competition",
    problem:
      "A boarding house marketplace platform supporting multi-role with booking, analytics, and admin fee features was needed.",
    approach:
      "Built a SaaS prototype with Next.js App Router, fully mocked data, 3 interactive dashboards, advanced filtering, dynamic booking, survey scheduling, and role-switching.",
    result:
      "Successfully demonstrated a scalable marketplace architecture with production-grade UX for the competition presentation.",
    repo: "https://github.com/AdhityaMaulana11/SolusiKos-Prototype-V1.0.git",
    live: "https://solusikos-prototype-v1-0.vercel.app/",
  },
  {
    id: "tasktunes",
    title: "TaskTunes",
    year: 2025,
    summary:
      "Android productivity app integrating the Pomodoro technique with a personal music experience to enhance focus.",
    screenshots: [],
    tech: [
      "Kotlin",
      "Android SDK",
      "MediaPlayer API",
      "SharedPreferences",
      "GSON",
    ],
    role: "Mobile Developer",
    duration: "Academic Project",
    problem:
      "Productivity apps lacked engagement due to no music integration and compelling visualizations.",
    approach:
      "Single-Activity architecture with Fragments, custom music player with waveform visualization, Pomodoro timer with automatic session transitions, and multi-user system via SharedPreferences + GSON.",
    result:
      "Successfully combined productivity and entertainment with real-time waveform, haptic feedback, and productivity tracking features.",
    repo: "https://github.com/AdhityaMaulana11/TaskTunes.git",
  },
  {
    id: "chrome-ext-autoupdate-data",
    title: "Data Update Automation — Chrome Extension",
    year: 2024,
    summary:
      "Chrome Extension to automate repetitive data update workflows on specific websites with pause, resume, and stop controls.",
    screenshots: [],
    tech: [
      "JavaScript",
      "Chrome Extension (MV3)",
      "DOM Manipulation",
      "MutationObserver",
      "Async/Await",
    ],
    role: "Automation Developer",
    duration: "Freelance Project",
    problem:
      "Manual data update processes on websites were highly repetitive and time-consuming.",
    approach:
      "Injected a control panel into the target page, auto-filled form fields, provided visual feedback for edited inputs, and sequential submission with MutationObserver for dynamic DOM tracking.",
    result:
      "Saved significant time on routine data update processes with reliable workflow automation.",
    repo: "https://github.com/AdhityaMaulana11/PrimaryCare-Autoupdate-Data-Chrome-Extension.git",
  },
  {
    id: "chrome-ext-autoanswer-healthcare-screening",
    title: "Screening Batch Answer Automation — Chrome Extension",
    year: 2024,
    summary:
      "Chrome Extension to automate batch screening form filling with automatic multi-step navigation.",
    screenshots: [],
    tech: [
      "JavaScript (ES6)",
      "Chrome Extension (MV3)",
      "DOM Manipulation",
      "Event Dispatching",
    ],
    role: "Automation Developer",
    duration: "Freelance Project",
    problem:
      "Multi-step screening forms had to be filled manually repeatedly, highly inefficient.",
    approach:
      "Floating control panel, auto-select radio buttons via label matching, event dispatching to simulate user interactions, auto-fill physical data, and dynamic BMI monitoring.",
    result:
      "Drastically accelerated screening administration processes with batch automation.",
    repo: "https://github.com/AdhityaMaulana11/Healthcare-Screening-Batch-Answer-Chrome-Extension.git",
  },
  {
    id: "spotify-testing-automation",
    title: "Spotify Web Automation Testing",
    year: 2024,
    summary:
      "Automated GUI testing framework for Spotify Web Player using Selenium WebDriver with Node.js.",
    screenshots: [],
    tech: ["Node.js", "Selenium WebDriver", "ChromeDriver", "dotenv", "Chalk"],
    role: "QA Automation Engineer",
    duration: "Academic Project",
    problem:
      "Manual GUI testing of Spotify Web Player was not scalable or reproducible.",
    approach:
      "Used Selenium WebDriver to simulate user interactions (auth, navigation, playback, UI validation) with ChromeDriver, dotenv for credential management, and Chalk for console reporting.",
    result:
      "Maintainable and scalable testing framework for automated browser testing.",
    repo: "https://github.com/AdhityaMaulana11/Spotify-Website-GUI-Testing.git",
  },
];
