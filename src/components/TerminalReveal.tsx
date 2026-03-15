import { useState, useEffect, ReactNode, useCallback } from "react";
import { motion } from "framer-motion";
import { useMode } from "../context/ModeContext";

interface TerminalRevealProps {
  command: string;
  children: ReactNode;
  delay?: number;
  active?: boolean;
  onComplete?: () => void;
}

const TerminalReveal = ({
  command,
  children,
  delay = 0,
  active = true,
  onComplete,
}: TerminalRevealProps) => {
  const { devMode } = useMode();
  const [typedCommand, setTypedCommand] = useState("");
  const [showContent, setShowContent] = useState(!devMode);

  const handleComplete = useCallback(() => {
    setShowContent(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!devMode) {
      setShowContent(true);
      setTypedCommand("");
      onComplete?.();
      return;
    }

    if (!active) {
      setShowContent(false);
      setTypedCommand("");
      return;
    }

    setShowContent(false);
    setTypedCommand("");

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedCommand(command.slice(0, i + 1));
        i++;
        if (i >= command.length) {
          clearInterval(interval);
          setTimeout(() => handleComplete(), 300);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devMode, command, delay, active]);

  if (!devMode) {
    return <>{children}</>;
  }

  if (!active && !showContent) {
    return null;
  }

  return (
    <div>
      <div className="font-mono text-xs text-terminal-green mb-2 flex items-center gap-1">
        <span className="text-primary">❯</span>
        <span>{typedCommand}</span>
        {typedCommand.length > 0 && typedCommand.length < command.length && (
          <span className="animate-blink">▋</span>
        )}
      </div>
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default TerminalReveal;
