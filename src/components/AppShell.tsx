import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Taskbar from "./Taskbar";
import TerminalWidget from "./TerminalWidget";
import TerminalFAB from "./TerminalFAB";
import BootScreen from "./BootScreen";
import StatusBar from "./StatusBar";
import DevLogToast from "./DevLogToast";
import { useMode } from "../context/ModeContext";
import { useDevNavLog } from "../hooks/useDevNavLog";

const BOOT_KEY = "bsb-booted";

const AppShell = () => {
  const { devMode, terminalOpen, transitioning } = useMode();
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem(BOOT_KEY) === "1",
  );

  useDevNavLog();

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    sessionStorage.setItem(BOOT_KEY, "1");
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Mode transition flash */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-background pointer-events-none animate-mode-glitch"
          />
        )}
      </AnimatePresence>

      {/* Dev mode overlays */}
      <AnimatePresence>
        {devMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[1] pointer-events-none scanline-overlay"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[1] pointer-events-none grain-texture"
            />
          </>
        )}
      </AnimatePresence>

      <main className="pb-20 relative z-[2]">
        <Outlet />
      </main>

      <DevLogToast />
      <StatusBar />
      <Taskbar />
      <TerminalFAB />
      <TerminalWidget />
    </div>
  );
};

export default AppShell;
