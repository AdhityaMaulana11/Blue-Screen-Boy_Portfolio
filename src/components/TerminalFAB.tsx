import { Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../context/ModeContext";

const TerminalFAB = () => {
  const { terminalOpen, toggleTerminal } = useMode();

  return (
    <AnimatePresence>
      {!terminalOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={toggleTerminal}
          className="fixed bottom-16 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-terminal-bg border border-primary/30 flex items-center justify-center shadow-lg hover:scale-110 transition-transform group terminal-glow"
          aria-label="Open Terminal (Ctrl+K)"
          title="Open Terminal (Ctrl+K)"
        >
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-green group-hover:drop-shadow-[0_0_8px_hsl(142,70%,56%,0.6)] transition-all" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-terminal-green animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default TerminalFAB;
