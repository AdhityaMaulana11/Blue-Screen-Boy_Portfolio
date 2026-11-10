import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  FolderOpen,
  Mail,
  Monitor,
  Code,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useMode } from "../context/ModeContext";

const Taskbar = () => {
  const location = useLocation();
  const { devMode, toggleDevMode, soundEnabled, toggleSound } = useMode();

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
            const isActive =
              location.pathname === path ||
              (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex flex-col items-center gap-0.5 px-3 sm:px-4 py-1.5 rounded-xl transition-all duration-200 group min-w-0 ${
                  isActive
                    ? devMode
                      ? "bg-primary/20 text-primary font-semibold"
                      : "bg-primary/15 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "drop-shadow-[0_0_8px_hsl(210,100%,56%,0.6)] text-primary"
                      : ""
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-xs tracking-tight truncate ${devMode ? "font-mono" : ""}`}
                >
                  {label}
                </span>

                {isActive && (
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full ${
                      devMode
                        ? "bg-terminal-green shadow-[0_0_6px_hsl(142,70%,56%,0.8)]"
                        : "bg-primary shadow-[0_0_6px_hsl(210,100%,56%,0.8)]"
                    }`}
                  />
                )}
              </Link>
            );
          })}

          {/* Dev Mode Toggle */}
          <button
            onClick={toggleDevMode}
            className={`flex flex-col items-center gap-0.5 px-3 sm:px-4 py-1.5 rounded-xl transition-all duration-200 group ${
              devMode
                ? "bg-terminal-green/15 text-terminal-green font-semibold border border-terminal-green/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
            aria-label={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
            title={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
          >
            {devMode ? (
              <Code className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_hsl(142,70%,56%,0.6)] text-terminal-green" />
            ) : (
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            )}
            <span className="text-[10px] sm:text-xs font-mono tracking-tight">
              {devMode ? "DEV" : "GUI"}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex flex-col items-center gap-0.5 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 group ${
              soundEnabled
                ? "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-secondary/40"
            }`}
            aria-label={
              soundEnabled ? "Mute sound effects" : "Enable sound effects"
            }
            title={
              soundEnabled
                ? "Sound: On (click to mute)"
                : "Sound: Off (click to enable)"
            }
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
            )}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-tight">
              {soundEnabled ? "SFX" : "MUTE"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
