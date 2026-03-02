import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Terminal } from "lucide-react";
import { useMode } from "../context/ModeContext";

const AUTO_HIDE_MS = 30_000;

const DevLogToast = () => {
  const { devMode, systemLogs } = useMode();
  const recent = systemLogs.slice(-3);
  const [collapsed, setCollapsed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const prevLogCount = useRef(systemLogs.length);

  // Reset timer & show whenever new logs arrive
  useEffect(() => {
    if (!devMode) return;
    if (systemLogs.length > prevLogCount.current) {
      setCollapsed(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCollapsed(true), AUTO_HIDE_MS);
    }
    prevLogCount.current = systemLogs.length;
  }, [systemLogs.length, devMode]);

  // Start initial timer when dev mode activates
  useEffect(() => {
    if (devMode && systemLogs.length > 0) {
      timerRef.current = setTimeout(() => setCollapsed(true), AUTO_HIDE_MS);
    }
    if (!devMode) {
      setCollapsed(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [devMode]);

  if (!devMode || recent.length === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 z-40 flex items-end">
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.button
            key="toggle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setCollapsed(false);
              if (timerRef.current) clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => setCollapsed(true), AUTO_HIDE_MS);
            }}
            className="ml-1 mb-1 p-1.5 rounded-r-md bg-secondary/80 border border-l-0 border-primary/20 text-primary hover:bg-primary/20 transition-colors backdrop-blur-sm"
            title="Show system logs"
          >
            <div className="flex items-center gap-0.5">
              <Terminal className="w-3 h-3" />
              <ChevronRight className="w-3 h-3" />
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="logs"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.25 }}
            className="ml-2 mb-1 max-w-xs"
          >
            <div className="flex items-start gap-1">
              <div className="flex-1 pointer-events-none">
                <AnimatePresence mode="popLayout">
                  {recent.map((log, i) => (
                    <motion.div
                      key={log.timestamp ?? i}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-mono text-[10px] leading-tight py-0.5"
                    >
                      <span className="text-muted-foreground">[LOG] </span>
                      <span
                        className={
                          log.type === "ok" ? "text-terminal-green" :
                          log.type === "warn" ? "text-window-yellow" :
                          log.type === "error" ? "text-destructive" :
                          "text-primary"
                        }
                      >
                        {log.msg}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="mt-0.5 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Hide system logs"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevLogToast;
