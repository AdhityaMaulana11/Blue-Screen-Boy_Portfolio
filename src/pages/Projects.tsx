import { useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Search,
  X,
  Layers,
  ArrowUpRight,
  FolderGit2,
} from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import TerminalReveal from "../components/TerminalReveal";
import { projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";

const CATEGORIES = ["All", "Full-Stack", "Automation", "Mobile"] as const;

const Projects = () => {
  const { devMode, pushLog } = useMode();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";
  const selectedTech = searchParams.get("tech") || "";
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    setSearchParams(params);
    if (devMode) {
      pushLog({ type: "info", msg: `Filter applied: category=${cat}` });
    }
  };

  const handleTechClick = (e: React.MouseEvent, tech: string) => {
    e.preventDefault();
    e.stopPropagation();
    const params = new URLSearchParams(searchParams);
    if (selectedTech === tech) {
      params.delete("tech");
    } else {
      params.set("tech", tech);
    }
    setSearchParams(params);
    if (devMode) {
      pushLog({ type: "info", msg: `Filter applied: tech=${tech}` });
    }
  };

  const clearTechFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tech");
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery("");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category match
      if (
        selectedCategory !== "All" &&
        project.category !== selectedCategory
      ) {
        return false;
      }
      // Tech match
      if (
        selectedTech &&
        !project.tech.some(
          (t) => t.toLowerCase() === selectedTech.toLowerCase(),
        )
      ) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesSummary = project.summary.toLowerCase().includes(query);
        const matchesTech = project.tech.some((t) =>
          t.toLowerCase().includes(query),
        );
        return matchesTitle || matchesSummary || matchesTech;
      }
      return true;
    });
  }, [selectedCategory, selectedTech, searchQuery]);

  const handleProjectClick = useCallback(
    (e: React.MouseEvent, projectId: string, title: string) => {
      if (!devMode) return;
      e.preventDefault();
      pushLog({ type: "info", msg: `Opening project ${title}...` });
      pushLog({ type: "ok", msg: "Loading architecture modules..." });
      setTimeout(() => navigate(`/projects/${projectId}`), 400);
    },
    [devMode, pushLog, navigate],
  );

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WindowFrame
            title={devMode ? "~/sys/projects — index.sh" : "~/projects — index"}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-7">
              <TerminalReveal command="ls -la ~/projects/" delay={0}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FolderGit2 className="w-5 h-5 text-primary" />
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        Featured{" "}
                        <span className="text-primary text-glow">Projects</span>
                        {devMode && (
                          <span className="animate-blink text-primary font-mono ml-1">
                            _
                          </span>
                        )}
                      </h1>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {devMode
                        ? `$ ls -la projects/ — ${projects.length} repository modules registered`
                        : "Exploration of scalable SaaS platforms, automation engines, and mobile tools"}
                    </p>
                  </div>

                  {/* Search bar */}
                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search projects or tech..."
                      className="w-full pl-9 pr-8 py-2 rounded-lg bg-secondary/80 border border-border/60 text-xs sm:text-sm font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Toolbar */}
                <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-muted-foreground mr-1 hidden sm:inline" />
                    {CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => handleCategorySelect(cat)}
                          className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/25"
                              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/30"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active filters / count */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    {selectedTech && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-terminal-green/15 text-terminal-green border border-terminal-green/30">
                        <span>tech: {selectedTech}</span>
                        <button
                          onClick={clearTechFilter}
                          className="hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {(selectedCategory !== "All" ||
                      selectedTech ||
                      searchQuery) && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-primary hover:underline"
                      >
                        Reset filters
                      </button>
                    )}

                    <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[11px]">
                      {filteredProjects.length} / {projects.length}
                    </span>
                  </div>
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="card-3d"
                >
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={(e) =>
                      handleProjectClick(e, project.id, project.title)
                    }
                    className="block group h-full"
                  >
                    <WindowFrame
                      title={`~/projects/${project.id}`}
                      className={`h-full flex flex-col ${devMode ? "dev-border-glow" : ""}`}
                    >
                      <div
                        className={`p-5 flex-1 flex flex-col justify-between ${devMode ? "" : "card-hover-glow"}`}
                      >
                        <div>
                          {/* Top Meta */}
                          <div className="flex items-start justify-between mb-3 gap-2">
                            <div>
                              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 mb-1.5">
                                {project.category}
                              </span>
                              <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                <span>{project.title}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary" />
                              </h3>
                            </div>
                            <span className="text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded border border-border/40 shrink-0">
                              {project.year}
                            </span>
                          </div>

                          {/* Summary */}
                          <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div>
                          {/* Tech Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tech.map((t) => {
                              const isSelected = selectedTech === t;
                              return (
                                <button
                                  key={t}
                                  onClick={(e) => handleTechClick(e, t)}
                                  className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                      : devMode
                                        ? "bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/25 border border-terminal-green/20"
                                        : "bg-secondary/70 text-secondary-foreground hover:bg-primary/15 hover:text-primary border border-border/30"
                                  }`}
                                  title={`Filter by ${t}`}
                                >
                                  {t}
                                </button>
                              );
                            })}
                          </div>

                          {/* Footer Info & Direct Links */}
                          <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2 font-mono truncate">
                              <span className="text-foreground/80">
                                {project.role}
                              </span>
                              <span>•</span>
                              <span>{project.duration}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              {project.live && (
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors"
                                  title="Open live preview"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {project.repo && (
                                <a
                                  href={project.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors"
                                  title="View source repository"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </WindowFrame>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 border-2 border-dashed border-border/50 rounded-xl"
              >
                <Layers className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-mono text-foreground font-medium">
                  No projects match your filter criteria
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try changing your category, tech filter, or search term
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-mono hover:brightness-110 transition-all"
                >
                  Reset all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;

