import { useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, FolderGit } from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import { projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";

const Projects = () => {
  const { devMode, pushLog, setTerminalOpen } = useMode();
  const navigate = useNavigate();

  const handleProjectClick = useCallback(
    (e: React.MouseEvent, projectId: string, title: string) => {
      if (!devMode) return;
      e.preventDefault();
      pushLog({ type: "info", msg: `Opening project ${title}...` });
      pushLog({ type: "ok", msg: "Loading architecture modules..." });
      pushLog({ type: "ok", msg: "Rendering interface..." });
      setTimeout(() => navigate(`/projects/${projectId}`), 800);
    },
    [devMode, pushLog, navigate],
  );

  const handleTechClick = useCallback(
    (e: React.MouseEvent, tech: string) => {
      if (!devMode) return;
      e.preventDefault();
      e.stopPropagation();
      pushLog({ type: "info", msg: `filter --tech ${tech}` });
      setTerminalOpen(true);
    },
    [devMode, pushLog, setTerminalOpen],
  );

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            <span className="text-primary text-glow">~/</span>projects
            {devMode && (
              <span className="animate-blink text-primary font-mono">_</span>
            )}
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-mono mb-6 sm:mb-8">
            {devMode
              ? `$ ls -la projects/ — ${projects.length} items loaded`
              : `${projects.length} projects`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={`/projects/${project.id}`}
                onClick={(e) =>
                  handleProjectClick(e, project.id, project.title)
                }
                className="block"
              >
                <WindowFrame
                  title={`~/projects/${project.id}`}
                  className={devMode ? "dev-border-glow" : ""}
                >
                  <div
                    className={`p-4 sm:p-5 rounded-b-lg ${devMode ? "" : "card-hover-glow"}`}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors min-w-0">
                        {project.title}
                      </h3>
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded flex-shrink-0">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          onClick={(e) => handleTechClick(e, t)}
                          className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded transition-colors ${
                            devMode
                              ? "bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20 cursor-pointer"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      <span className="font-mono truncate">{project.role}</span>
                      <span>•</span>
                      <span className="truncate">{project.duration}</span>
                      <div className="ml-auto flex gap-2 flex-shrink-0">
                        {project.live && (
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        )}
                        {project.repo && (
                          <FolderGit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        )}
                      </div>
                    </div>
                  </div>
                </WindowFrame>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
