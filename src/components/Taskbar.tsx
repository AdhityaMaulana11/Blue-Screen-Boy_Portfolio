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
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div
        className={`backdrop-blur-xl border-t px-2 py-1.5 transition-colors duration-500 ${
          devMode
            ? "bg-terminal-bg/95 border-primary/20"
            : "bg-taskbar/95 border-white/10"
        }`}
      >
        <div className="flex items-center justify-around">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive =
              location.pathname === path ||
              (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? devMode
                      ? "text-terminal-green font-semibold"
                      : "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] tracking-tight">{label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 w-1.5 h-1 rounded-full ${
                      devMode ? "bg-terminal-green" : "bg-primary"
                    }`}
                  />
                )}
              </Link>
            );
          })}

          <button
            onClick={toggleDevMode}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl transition-all duration-200 ${
              devMode
                ? "text-terminal-green font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={devMode ? "Switch to GUI Mode" : "Switch to Dev Mode"}
            title={
              devMode
                ? "DEV Mode active: click to return to normal view"
                : "Switch to DEV Mode: adds terminal overlays and logs"
            }
          >
            {devMode ? (
              <Code className="w-4 h-4 text-terminal-green" />
            ) : (
              <Monitor className="w-4 h-4" />
            )}
            <span className="text-[10px] font-mono">{devMode ? "DEV" : "GUI"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
