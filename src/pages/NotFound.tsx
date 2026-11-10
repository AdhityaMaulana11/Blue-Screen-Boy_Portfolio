import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, FolderOpen, AlertTriangle } from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import { useMode } from "../context/ModeContext";

const NotFound = () => {
  const location = useLocation();
  const { devMode, pushLog } = useMode();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );

    if (devMode) {
      pushLog({ type: "error", msg: `404 at ${location.pathname}` });
      pushLog({ type: "warn", msg: "ERR_ROUTE_NOT_FOUND" });
    }
  }, [location.pathname, devMode, pushLog]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl transition-opacity duration-500 ${
            devMode ? "bg-primary/8" : "bg-primary/5"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-3xl transition-opacity duration-500 ${
            devMode ? "bg-terminal-green/5" : "bg-primary/3"
          }`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <WindowFrame
          title={devMode ? "~/sys/error — exception" : "~/404 — missing route"}
          className={devMode ? "dev-border-glow" : ""}
        >
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className={`mb-5 flex items-center justify-center w-16 h-16 rounded-2xl ${
                  devMode
                    ? "bg-terminal-green/10 border border-terminal-green/20"
                    : "bg-primary/10 border border-primary/20"
                }`}
              >
                <AlertTriangle
                  className={`w-8 h-8 ${
                    devMode ? "text-terminal-green" : "text-primary"
                  }`}
                />
              </motion.div>

              {/* Main error text */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="space-y-3"
              >
                <h1
                  className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${
                    devMode ? "text-terminal-green" : "text-primary text-glow"
                  }`}
                >
                  {devMode ? "ERR 404" : "404"}
                </h1>

                <h2 className="text-lg sm:text-2xl font-semibold text-foreground">
                  {devMode ? "Route Not Found" : "Oops! Page not found"}
                  {devMode && (
                    <span className="animate-blink text-terminal-green font-mono ml-1">
                      _
                    </span>
                  )}
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                  {devMode
                    ? "The requested route could not be resolved by the system. The resource may have been moved, deleted, or never existed."
                    : "The page you're looking for doesn't exist, may have been moved, or the link might be broken."}
                </p>
              </motion.div>

              {/* Route detail box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className={`mt-6 w-full max-w-xl rounded-xl border px-4 py-3 text-left font-mono text-xs sm:text-sm ${
                  devMode
                    ? "bg-terminal-bg border-primary/20 text-terminal-green"
                    : "bg-secondary border-border text-muted-foreground"
                }`}
              >
                <div className="flex flex-col gap-1">
                  {devMode ? (
                    <>
                      <span>[WARN] Route lookup failed</span>
                      <span className="break-all">
                        [PATH] {location.pathname}
                      </span>
                      <span>[INFO] Fallback navigation available</span>
                    </>
                  ) : (
                    <>
                      <span className="text-foreground">Requested path:</span>
                      <span className="break-all">{location.pathname}</span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Branding touch */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-6 text-xs sm:text-sm font-mono text-muted-foreground"
              >
                {devMode ? (
                  <span className="text-terminal-green">
                    blue-screen-boy.sys :: exception handler active
                  </span>
                ) : (
                  <span>
                    Looks like you hit a dead route in the{" "}
                    <span className="text-primary font-semibold">
                      Blue Screen Boy
                    </span>{" "}
                    system.
                  </span>
                )}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                <Link
                  to="/"
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                    devMode
                      ? "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30 dev-border-glow"
                      : "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {devMode ? "$ cd ~/" : "Return Home"}
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 glass-surface rounded-lg font-medium text-xs sm:text-sm text-foreground hover:bg-secondary transition-all"
                >
                  <FolderOpen className="w-4 h-4" />
                  {devMode ? "$ ls ~/projects" : "View Projects"}
                </Link>
              </motion.div>
            </div>
          </div>
        </WindowFrame>
      </motion.div>
    </div>
  );
};

export default NotFound;
