import { useLocation, Link } from "react-router-dom";
import { useMode } from "../context/ModeContext";
import { Monitor, Code, Volume2, VolumeX, Terminal } from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  "/": "~",
  "/about": "~/about",
  "/projects": "~/projects",
  "/contact": "~/contact",
};

const TopNav = () => {
  const location = useLocation();
  const { devMode, toggleDevMode, soundEnabled, toggleSound, toggleTerminal } = useMode();

  const currentLabel =
    ROUTE_LABELS[location.pathname] ??
    (location.pathname.startsWith("/projects/")
      ? `~/projects/${location.pathname.split("/projects/")[1]}`
      : location.pathname);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10 transition-colors duration-300"
      aria-label="Site header"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">
        {/* Left: Brand mark + Breadcrumb route */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Blue Screen Boy | Home"
          >
            <div className="w-8 h-8 rounded-lg bg-card border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                BSB
              </span>
            </div>
            <div className="hidden xs:flex flex-col">
              <span className="text-xs font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                Blue Screen Boy
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                Adhitya M. W.
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span
              className={`text-xs font-mono transition-colors duration-300 ${
                devMode ? "text-terminal-green" : "text-muted-foreground"
              }`}
              aria-current="location"
            >
              {currentLabel}
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden sm:flex items-center gap-1 bg-secondary/40 p-1 rounded-xl border border-white/5">
          {navLinks.map(({ path, label }) => {
            const isActive =
              location.pathname === path ||
              (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? devMode
                      ? "text-terminal-green bg-terminal-green/10 shadow-sm font-semibold"
                      : "text-primary bg-primary/10 shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
                {isActive && (
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full ${
                      devMode ? "bg-terminal-green" : "bg-primary"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Controls & Terminal */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Terminal Launcher */}
          <button
            onClick={toggleTerminal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-white/10 hover:border-terminal-green/40 hover:bg-terminal-green/5 text-muted-foreground hover:text-terminal-green transition-all"
            aria-label="Open Terminal console"
            title="Open Console (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-terminal-green" />
            <span className="hidden md:inline">Ctrl+K</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 border border-white/5 transition-colors"
            aria-label={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
            title={soundEnabled ? "Audio SFX: ON" : "Audio SFX: OFF"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/60" />
            )}
          </button>

          {/* Mode Toggle Switch */}
          <button
            onClick={toggleDevMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
              devMode
                ? "bg-terminal-green/10 text-terminal-green border-terminal-green/30"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground border-white/5"
            }`}
            aria-label={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
            title={devMode ? "DEV Mode Active" : "GUI Mode Active"}
          >
            {devMode ? (
              <Code className="w-3.5 h-3.5 text-terminal-green" />
            ) : (
              <Monitor className="w-3.5 h-3.5" />
            )}
            <span className="text-[11px] font-bold">{devMode ? "DEV" : "GUI"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
