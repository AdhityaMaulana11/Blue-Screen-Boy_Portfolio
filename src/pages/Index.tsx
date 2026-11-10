import { motion } from "framer-motion";
import { Download, ChevronRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import WindowFrame from "../components/WindowFrame";
import { personalInfo } from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import profileImage from "./pp-linkedin.jpeg";

const Index = () => {
  const { devMode, toggleTerminal } = useMode();

  const headline = devMode
    ? "Building Scalable Systems & Automating Complex Workflows"
    : personalInfo.tagline;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl transition-opacity duration-500 ${devMode ? "bg-primary/8" : "bg-primary/5"}`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-3xl transition-opacity duration-500 ${devMode ? "bg-terminal-green/5" : "bg-primary/3"}`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <WindowFrame
          title="~/blue-screen-boy — welcome"
          className={devMode ? "dev-border-glow" : ""}
        >
          <div className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
              <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-sm font-mono text-terminal-green mb-2">
                    {devMode && <span className="animate-blink">▋</span>} Hello,
                    World!
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
                    <span className="text-foreground">I'm </span>
                    <span className="text-primary text-glow">
                      {personalInfo.alias}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2">
                    a.k.a{" "}
                    <span className="text-foreground font-medium">
                      {personalInfo.name}
                    </span>
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  {headline}
                  {devMode && (
                    <span className="animate-blink text-primary font-mono">
                      _
                    </span>
                  )}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
                >
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/25"
                  >
                    {devMode ? "ls ~/projects" : "View Projects"}{" "}
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  {devMode ? (
                    <button
                      onClick={toggleTerminal}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass-surface rounded-lg font-medium text-xs sm:text-sm text-terminal-green hover:bg-secondary transition-all dev-border-glow"
                    >
                      <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Open
                      Console
                    </button>
                  ) : (
                    <a
                      href="/CV-Adhitya_Maulana_Wijaya.pdf"
                      download
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass-surface rounded-lg font-medium text-xs sm:text-sm text-foreground hover:bg-secondary transition-all"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                      Download CV
                    </a>
                  )}
                  {devMode && (
                    <a
                      href="/CV-Adhitya_Maulana_Wijaya.pdf"
                      download
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass-surface rounded-lg font-medium text-xs sm:text-sm text-foreground hover:bg-secondary transition-all"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> CV
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Right: Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex-shrink-0 order-first lg:order-last"
              >
                <div
                  className={`group w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl glass-surface relative overflow-hidden cursor-pointer ${
                    devMode ? "dev-border-glow" : "glass-glow"
                  }`}
                >
                  {devMode && (
                    <div className="scanline absolute inset-0 z-10 pointer-events-none" />
                  )}

                  {/* Profile Image */}
                  <img
                    src="./pp-linkedin.jpeg"
                    alt="Adhitya Maulana Wijaya"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="text-2xl sm:text-3xl font-bold text-primary text-glow glitch-hover">
                      BSB
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-terminal-green">
                      v{devMode ? "2.0.0" : "1.0.0"} — online
                      {devMode && <span className="animate-blink ml-1">▋</span>}
                    </div>
                  </div>

                  {/* Subtle top gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Quick terminal hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/30"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] sm:text-xs font-mono text-muted-foreground flex-wrap">
                <span>Press</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[9px] sm:text-[10px]">
                  Ctrl+K
                </span>
                <span>/</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[9px] sm:text-[10px]">
                  ⌘+K
                </span>
                <span>to interact with my system</span>
                {devMode && (
                  <>
                    <span className="text-terminal-green">•</span>
                    <span className="text-terminal-green">DEV MODE ACTIVE</span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </WindowFrame>
      </motion.div>
    </div>
  );
};

export default Index;
