import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  ChevronDown,
  UserCheck,
  Clock,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Cpu,
  Layers,
} from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import TerminalReveal from "../components/TerminalReveal";
import { projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import { usePageMeta } from "../hooks/usePageMeta";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { devMode, pushLog } = useMode();
  const project = projects.find((p) => p.id === id);
  const [logsOpen, setLogsOpen] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  usePageMeta({
    title: project ? project.title : "Project Not Found",
    description: project
      ? `${project.summary} | Built with ${project.tech.slice(0, 4).join(", ")}.`
      : "This project could not be found in the portfolio.",
    canonical: `/projects/${id}`,
  });

  useEffect(() => {
    if (devMode && project) {
      pushLog({ type: "info", msg: `Project "${project.id}" loaded.` });
    }
  }, [devMode, project, pushLog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    if (devMode) {
      pushLog({ type: "ok", msg: "Project URL copied to clipboard." });
    }
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            Project not found
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Module "{id}" could not be resolved in the repository.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-primary font-mono text-sm hover:underline mt-2"
          >
            <ArrowLeft className="w-4 h-4" /> cd ../projects
          </Link>
        </div>
      </div>
    );
  }

  const executionLogs = [
    {
      level: "INIT",
      msg: `${project.role} role initialized for category [${project.category}].`,
      color: "text-primary",
    },
    ...project.tech.map((t) => ({
      level: "LOAD",
      msg: `Package "${t}" loaded and compiled.`,
      color: "text-terminal-green",
    })),
    {
      level: "WARN",
      msg: `Challenge: ${project.problem.slice(0, 60)}...`,
      color: "text-window-yellow",
    },
    {
      level: "OK",
      msg: `Engineered: ${project.approach.slice(0, 60)}...`,
      color: "text-terminal-green",
    },
    {
      level: "OK",
      msg: `Result: ${project.result.slice(0, 60)}...`,
      color: "text-terminal-green",
    },
    {
      level: "DONE",
      msg: `Project "${project.title}" rendered with zero exceptions.`,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Navigation & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-2"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> cd ../projects
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/80 hover:bg-secondary border border-border/50 text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
            title="Copy project share URL"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-terminal-green" />
                <span className="text-terminal-green">Link copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Share link</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Header Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <WindowFrame
            title={`~/projects/${project.id} : README.md`}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command={`cat ~/projects/${project.id}/README.md`}
                delay={0}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 mb-2">
                        {project.category}
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {project.title}
                        {devMode && (
                          <span className="animate-blink text-primary font-mono ml-1">
                            _
                          </span>
                        )}
                      </h1>
                    </div>
                    <span className="text-xs sm:text-sm font-mono bg-secondary px-3 py-1 rounded-md text-secondary-foreground border border-border/50">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/60 font-mono text-muted-foreground border border-border/40">
                      <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{project.role}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/60 font-mono text-muted-foreground border border-border/40">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{project.duration}</span>
                    </span>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-primary text-primary-foreground font-medium hover:brightness-110 shadow-sm shadow-primary/25 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.repo && project.repo.trim() !== "" && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-secondary text-foreground hover:bg-secondary/80 border border-border/60 transition-all font-medium"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Architecture & Preview Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <WindowFrame
            title={`~/projects/${project.id} : architecture.view`}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command={`open ~/projects/${project.id}/architecture.view`}
                delay={150}
              >
                {project.screenshots.length > 0 ? (
                  <div className="space-y-4">
                    {project.screenshots.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} preview ${i + 1}`}
                        className="w-full rounded-lg border border-border/50 object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : (
                  /* Custom Architectural Blueprint Box */
                  <div className="rounded-xl border border-border/60 bg-gradient-to-b from-secondary/40 to-secondary/10 p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-border/40 text-xs font-mono text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">
                          Architectural Spec & Stack Blueprint
                        </span>
                      </div>
                      <span className="text-terminal-green flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                        System Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-lg bg-background/50 border border-border/40">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">
                          Target Platform
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {project.category}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-background/50 border border-border/40">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">
                          Lead Architecture
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {project.role}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-background/50 border border-border/40">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">
                          Release Timeline
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {project.year} • {project.duration}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground mr-1">
                        Technologies:
                      </span>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Case Study Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <WindowFrame
            title="case-study.md"
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8 space-y-6">
              <TerminalReveal command="cat case-study.md" delay={300}>
                <div className="space-y-6">
                  {/* Problem */}
                  <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 space-y-2">
                    <div className="flex items-center gap-2 text-destructive font-bold text-sm font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <h3>Problem & Challenge</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-6">
                      {project.problem}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 space-y-2">
                    <div className="flex items-center gap-2 text-window-yellow font-bold text-sm font-mono">
                      <Lightbulb className="w-4 h-4 shrink-0" />
                      <h3>Engineered Approach & Solution</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-6">
                      {project.approach}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-4 rounded-xl bg-terminal-green/5 border border-terminal-green/20 space-y-2">
                    <div className="flex items-center gap-2 text-terminal-green font-bold text-sm font-mono">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <h3>Results & Impact</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-6">
                      {project.result}
                    </p>
                  </div>
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Tech Stack Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <WindowFrame
            title="tech-stack.json"
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-7">
              <TerminalReveal command="cat tech-stack.json" delay={400}>
                <div className="flex items-center gap-2 mb-3 text-sm font-mono text-muted-foreground">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">
                    Technologies in this Project
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Link
                      key={t}
                      to={`/projects?tech=${encodeURIComponent(t)}`}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                        devMode
                          ? "bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20 border border-terminal-green/20"
                          : "bg-secondary text-foreground hover:bg-primary/15 hover:text-primary border border-border/40"
                      }`}
                      title={`Find other projects built with ${t}`}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* System Execution Log: Dev Mode Only */}
        <AnimatePresence>
          {devMode && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <WindowFrame title="execution.log" variant="terminal">
                <div className="p-5 sm:p-7">
                  <button
                    onClick={() => setLogsOpen(!logsOpen)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-mono text-terminal-green mb-3 hover:text-terminal-text transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${logsOpen ? "" : "-rotate-90"}`}
                    />
                    <span>SYSTEM EXECUTION LOG</span>
                  </button>
                  <AnimatePresence>
                    {logsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="font-mono text-xs space-y-1.5 overflow-hidden"
                      >
                        {executionLogs.map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + i * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <span className={`${log.color} shrink-0`}>
                              [{log.level}]
                            </span>
                            <span className="text-foreground/80 break-words">
                              {log.msg}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </WindowFrame>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next / Previous Project Footer Navigation */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-border/40">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground">Previous</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate max-w-[140px] sm:max-w-xs">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-colors ml-auto text-right"
            >
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Next Project</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate max-w-[140px] sm:max-w-xs">
                  {nextProject.title}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

