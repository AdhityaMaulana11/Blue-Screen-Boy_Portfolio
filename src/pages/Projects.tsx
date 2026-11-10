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
  ChevronRight,
  Zap,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import { usePageMeta } from "../hooks/usePageMeta";

const CATEGORIES = ["All", "Full-Stack", "Automation", "Mobile"] as const;

const Projects = () => {
  const { devMode, pushLog } = useMode();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  usePageMeta({
    title: "Projects",
    description:
      "Explore featured projects by Adhitya Maulana Wijaya : SaaS platforms, Chrome automation extensions, Android apps, and Selenium testing frameworks.",
    canonical: "/projects",
  });

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
      if (
        selectedCategory !== "All" &&
        project.category !== selectedCategory
      ) {
        return false;
      }
      if (
        selectedTech &&
        !project.tech.some(
          (t) => t.toLowerCase() === selectedTech.toLowerCase(),
        )
      ) {
        return false;
      }
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
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10 max-w-6xl mx-auto space-y-8">
      {/* Header & Filter Controller */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl glass-surface p-5 sm:p-7 border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <FolderGit2 className="w-5 h-5 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Engineered Systems & Prototypes
              </h1>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm font-mono">
              {devMode
                ? `$ ls -la projects/ : ${projects.length} repository modules registered`
                : "Scalable full-stack SaaS platforms, browser automation extensions, and QA testing suites"}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-secondary/70 border border-white/10 text-xs sm:text-sm font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/20"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active filters & Counter */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            {selectedTech && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-terminal-green/15 text-terminal-green border border-terminal-green/30">
                <span>tech: {selectedTech}</span>
                <button
                  onClick={clearTechFilter}
                  className="hover:text-foreground ml-1"
                  aria-label="Remove tech filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(selectedCategory !== "All" || selectedTech || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-primary hover:underline font-mono"
              >
                Reset filters
              </button>
            )}

            <span className="px-2.5 py-1 rounded-lg bg-secondary/80 text-foreground text-xs font-mono border border-white/5">
              {filteredProjects.length} / {projects.length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => {
              const previewImage = project.screenshots[0] || "/placeholder.svg";
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl glass-surface border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  <div>
                    {/* Visual Preview Banner */}
                    <Link
                      to={`/projects/${project.id}`}
                      onClick={(e) =>
                        handleProjectClick(e, project.id, project.title)
                      }
                      className="block relative aspect-video overflow-hidden bg-card/60"
                    >
                      <img
                        src={previewImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-background/85 backdrop-blur-md text-[10px] font-mono text-primary font-medium border border-white/10">
                        {project.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-background/85 backdrop-blur-md text-[10px] font-mono text-muted-foreground border border-white/10">
                        {project.year}
                      </div>
                    </Link>

                    {/* Project Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-1">
                          <Link
                            to={`/projects/${project.id}`}
                            onClick={(e) =>
                              handleProjectClick(e, project.id, project.title)
                            }
                          >
                            {project.title}
                          </Link>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </h2>
                        <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                          {project.role} | {project.duration}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Problem/Result Highlight */}
                      {project.result && (
                        <div className="p-2.5 rounded-xl bg-secondary/50 border border-white/5 text-[11px] font-mono text-foreground/80 flex items-start gap-2">
                          <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{project.result}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Tech tags and Links */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => {
                        const isSelected = selectedTech === t;
                        return (
                          <button
                            key={t}
                            onClick={(e) => handleTechClick(e, t)}
                            className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md transition-all ${
                              isSelected
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary border border-white/5"
                            }`}
                            title={`Filter by ${t}`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <Link
                        to={`/projects/${project.id}`}
                        onClick={(e) =>
                          handleProjectClick(e, project.id, project.title)
                        }
                        className="inline-flex items-center gap-1 font-mono text-primary hover:underline text-xs"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-secondary/60 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors border border-white/5"
                            title="Open live preview"
                            aria-label={`Open live preview for ${project.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.repo && project.repo.trim() !== "" && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-secondary/60 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors border border-white/5"
                            title="View source repository"
                            aria-label={`View repository for ${project.title}`}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16 border border-dashed border-white/10 rounded-2xl p-8"
            >
              <Layers className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm font-mono text-foreground font-medium">
                No projects match your filter criteria
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try clearing search terms or selecting another category
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-medium hover:brightness-110 transition-all shadow-md shadow-primary/20"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
