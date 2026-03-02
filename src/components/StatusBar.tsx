import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../context/ModeContext";

const StatusBar = () => {
  const { devMode } = useMode();

  return (
    <AnimatePresence>
      {devMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-12 left-0 right-0 z-40 pointer-events-none"
        >
          <div className="flex justify-center px-2">
            <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-muted-foreground/60 uppercase flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 bg-background/80 backdrop-blur-sm rounded-t border-t border-x border-border/30">
              <span>Status: <span className="text-terminal-green">Online</span></span>
              <span className="text-border">|</span>
              <span>Auth: <span className="text-primary">Enabled</span></span>
              <span className="text-border hidden sm:inline">|</span>
              <span className="hidden sm:inline">API: <span className="text-terminal-green">Active</span></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusBar;
