import { motion } from "framer-motion";
import { Download, ChevronRight, Terminal, ArrowUpRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { personalInfo, projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import { usePageMeta } from "../hooks/usePageMeta";

const Index = () => {
  const { devMode, toggleTerminal } = useMode();

  usePageMeta({
    title: "Home",
    description:
      "Portfolio of Adhitya Maulana Wijaya (Blue Screen Boy) - Full-Stack Developer & Automation Engineer. Explore projects built with React, Next.js, Node.js, and Selenium.",
    canonical: "/",
  });

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-[100dvh] px-4 sm:px-6 py-6 sm:py-10 max-w-6xl mx-auto space-y-16 sm:space-y-24">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-all duration-700 ${
            devMode ? "bg-terminal-green/5" : "bg-primary/8"
          }`}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-primary/5"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="text-muted-foreground">
                {devMode ? "KERNEL // SYSTEM_ONLINE" : "Available for freelance & full-time roles"}
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                Building Scalable Web Systems & Automation
              </h1>
              <p className="text-sm sm:text-base font-mono text-primary font-medium">
                {personalInfo.alias} <span className="text-muted-foreground/60">/</span> {personalInfo.name}
              </p>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Undergraduate Computer Science engineer specializing in full-stack platforms, production SaaS prototypes, and high-reliability browser automation pipelines.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {devMode ? "ls ~/projects" : "Explore Projects"}
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="/CV-Adhitya_Maulana_Wijaya.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/80 hover:bg-secondary border border-white/10 text-foreground font-medium text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-muted-foreground" />
                Download CV
              </a>

              <button
                onClick={toggleTerminal}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-white/5 text-muted-foreground hover:text-terminal-green text-xs font-mono transition-all"
                title="Launch Console (Ctrl+K)"
              >
                <Terminal className="w-4 h-4 text-terminal-green" />
                <span className="hidden xs:inline">Console</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-foreground">6+</div>
                <div className="text-[11px] text-muted-foreground">Projects Shipped</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-primary">3x</div>
                <div className="text-[11px] text-muted-foreground">Competition Awards</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-terminal-green">100%</div>
                <div className="text-[11px] text-muted-foreground">Workflow Automation</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Identity Card & Tech Snapshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className={`p-5 sm:p-6 rounded-2xl glass-surface relative overflow-hidden transition-all duration-300 ${
              devMode ? "border-terminal-green/30 shadow-terminal-green/10 shadow-lg" : "border-white/10 shadow-2xl"
            }`}>
              {/* Corner tech badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">NODE // 01</span>
                  <span className="text-xs text-muted-foreground font-mono">ID: BSB-SYS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-terminal-green" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Avatar + Personal Info */}
              <div className="flex items-center gap-4 py-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/15 shrink-0 group">
                  <img
                    src="/pp-linkedin.jpeg"
                    alt="Adhitya Maulana Wijaya"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-bold text-foreground">
                    Adhitya M. Wijaya
                  </div>
                  <div className="text-xs font-mono text-primary">
                    Full-Stack & QA Automation
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Universitas Kuningan (Informatika)
                  </div>
                </div>
              </div>

              {/* Skills Radar Badges */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React.js", "Next.js", "Node.js", "Selenium", "Chrome MV3", "TypeScript", "Sequelize"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-secondary/80 text-[11px] font-mono text-foreground/90 border border-white/5"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Fast Terminal / Shortcut Cue */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Interactive mode</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-primary font-bold">
                  {devMode ? "DEV ACTIVE" : "GUI MODE"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flagship Projects Section */}
      <section className="relative z-10 space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-1">
              Selected Engineering Work
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-foreground tracking-tight">
              Featured Production Platforms
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-primary hover:text-primary/80 transition-colors"
          >
            <span>View all projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => {
            const previewImage = project.screenshots[0] || "/placeholder.svg";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="group rounded-2xl glass-surface overflow-hidden border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Visual Asset Preview */}
                  <Link to={`/projects/${project.id}`} className="block relative aspect-video overflow-hidden bg-card/60">
                    <img
                      src={previewImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md text-[10px] font-mono text-foreground border border-white/10">
                      {project.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-md text-[10px] font-mono text-muted-foreground border border-white/10">
                      {project.year}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      <Link to={`/projects/${project.id}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tech & Link */}
                <div className="p-4 sm:p-5 pt-0 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/40 text-muted-foreground/60">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:underline pt-2 border-t border-white/5 w-full justify-between"
                  >
                    <span>Inspect System</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Engineering Pillars Strip */}
      <section className="relative z-10 pt-4">
        <div className="rounded-2xl glass-surface p-6 sm:p-8 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Full-Stack Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                React, Next.js, Express, and SQL databases designed for resilient performance, clean REST APIs, and strict security.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-terminal-green font-mono text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Workflow Automation</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Chrome Extension Manifest V3 tooling, DOM mutation listeners, and automated data synchronization systems.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>QA & Testing Pipelines</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Automated GUI and browser testing with Selenium WebDriver, end-to-end assertions, and structured execution logs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
