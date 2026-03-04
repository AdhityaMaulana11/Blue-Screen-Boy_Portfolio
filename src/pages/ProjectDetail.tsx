import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Link2,
  FolderGit,
  ChevronDown,
} from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import { projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const { devMode, pushLog } = useMode();
  const project = projects.find((p) => p.id === id);
  const [logsOpen, setLogsOpen] = useState(true);

  useEffect(() => {
    if (devMode && project) {
      pushLog({ type: "info", msg: `Project "${project.id}" loaded.` });
    }
  }, [devMode, project, pushLog]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Project not found
          </h1>
          <Link
            to="/projects"
            className="text-primary font-mono text-sm mt-2 inline-block"
          >
            ← cd ../projects
          </Link>
        </div>
      </div>
    );
  }

  const executionLogs = [
    {
      level: "INIT",
      msg: `${project.role} role detected.`,
      color: "text-primary",
    },
    ...project.tech.map((t) => ({
      level: "LOAD",
      msg: `Module "${t}" loaded.`,
      color: "text-terminal-green",
    })),
    {
      level: "WARN",
      msg: `Problem: ${project.problem.slice(0, 70)}...`,
      color: "text-window-yellow",
    },
    {
      level: "OK",
      msg: `Approach: ${project.approach.slice(0, 70)}...`,
      color: "text-terminal-green",
    },
    {
      level: "OK",
      msg: `Result: ${project.result.slice(0, 70)}...`,
      color: "text-terminal-green",
    },
    {
      level: "DONE",
      msg: `Project "${project.title}" rendered successfully.`,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> cd ../projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <WindowFrame
            title={`~/projects/${project.id} — README.md`}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.title}
                    {devMode && (
                      <span className="animate-blink text-primary font-mono">
                        _
                      </span>
                    )}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {project.summary}
                  </p>
                </div>
                <span className="text-sm font-mono bg-secondary px-3 py-1 rounded text-secondary-foreground">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="font-mono text-muted-foreground">
                  👤 {project.role}
                </span>
                <span className="font-mono text-muted-foreground">
                  ⏱ {project.duration}
                </span>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <FolderGit className="w-3.5 h-3.5" /> Github Repo
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <Link2 className="w-3.5 h-3.5" /> Project Online
                  </a>
                )}
              </div>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <WindowFrame
            title="case-study.md"
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-6 sm:p-8 space-y-6">
              {[
                {
                  label: "🔍 Problem",
                  content: project.problem,
                  color: "text-destructive",
                },
                {
                  label: "💡 Approach",
                  content: project.approach,
                  color: "text-window-yellow",
                },
                {
                  label: "🚀 Result",
                  content: project.result,
                  color: "text-terminal-green",
                },
              ].map((section) => (
                <div key={section.label}>
                  <h3
                    className={`font-bold font-mono text-sm ${section.color} mb-1`}
                  >
                    {section.label}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </WindowFrame>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <WindowFrame
            title="tech-stack.json"
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-6 sm:p-8">
              <h3 className="font-bold text-sm font-mono text-muted-foreground mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Link
                    key={t}
                    to={`/projects?tech=${t}`}
                    className={`px-3 py-1.5 rounded-md text-sm font-mono transition-colors ${
                      devMode
                        ? "bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </WindowFrame>
        </motion.div>

        {/* System Execution Log — Dev Mode Only */}
        <AnimatePresence>
          {devMode && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <WindowFrame title="execution.log" variant="terminal">
                <div className="p-6 sm:p-8">
                  <button
                    onClick={() => setLogsOpen(!logsOpen)}
                    className="flex items-center gap-2 text-sm font-mono text-terminal-green mb-3 hover:text-terminal-text transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${logsOpen ? "" : "-rotate-90"}`}
                    />
                    SYSTEM EXECUTION LOG
                  </button>
                  <AnimatePresence>
                    {logsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="font-mono text-xs space-y-1 overflow-hidden"
                      >
                        {executionLogs.map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="flex gap-2"
                          >
                            <span className={log.color}>[{log.level}]</span>
                            <span className="text-foreground/80">
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
      </div>
    </div>
  );
};

export default ProjectDetail;
