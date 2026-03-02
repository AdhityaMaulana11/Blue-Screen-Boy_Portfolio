import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  FolderOpen,
  Mail,
  Terminal,
  Monitor,
  Code,
} from "lucide-react";
import { useMode } from "../context/ModeContext";

const Taskbar = () => {
  const location = useLocation();
  const { devMode, toggleDevMode, terminalOpen, toggleTerminal } = useMode();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`backdrop-blur-xl border-t px-2 sm:px-4 py-1.5 sm:py-2 transition-colors duration-500 ${
          devMode
            ? "bg-terminal-bg/90 border-primary/20"
            : "bg-taskbar/90 border-border/50"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-0.5 sm:gap-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg transition-all duration-200 group min-w-0 ${
                  isActive
                    ? devMode
                      ? "bg-primary/20 text-primary"
                      : "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${isActive ? "drop-shadow-[0_0_6px_hsl(210,100%,56%,0.5)]" : ""}`}
                />
                <span
                  className={`text-[9px] sm:text-xs font-medium truncate ${devMode ? "font-mono" : ""}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Dev Mode Toggle */}
          <button
            onClick={toggleDevMode}
            className={`flex flex-col items-center gap-0.5 px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg transition-all duration-200 group ${
              devMode
                ? "bg-terminal-green/15 text-terminal-green"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
            aria-label={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
            title={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
          >
            {devMode ? (
              <Code className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 drop-shadow-[0_0_6px_hsl(142,70%,56%,0.5)]" />
            ) : (
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            )}
            <span className="text-[9px] sm:text-xs font-medium font-mono">
              {devMode ? "Dev" : "GUI"}
            </span>
          </button>

          {/* Terminal */}
          <button
            onClick={toggleTerminal}
            className={`flex flex-col items-center gap-0.5 px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg transition-all duration-200 group ${
              terminalOpen
                ? "bg-terminal-green/15 text-terminal-green"
                : "text-muted-foreground hover:text-terminal-green hover:bg-secondary/50"
            }`}
            aria-label="Toggle Terminal (Ctrl+K)"
          >
            <Terminal
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${terminalOpen ? "drop-shadow-[0_0_6px_hsl(142,70%,56%,0.5)]" : ""}`}
            />
            <span className="text-[9px] sm:text-xs font-medium font-mono">
              Terminal
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
