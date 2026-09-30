import { useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
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
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    setIsTyping(false);
    setTypedCommand(command);
    setShowContent(true);
    onComplete?.();
  }, [onComplete, command]);

  const handleSkip = useCallback(() => {
    if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    handleComplete();
  }, [handleComplete]);

  useEffect(() => {
    if (!devMode) {
      setShowContent(true);
      setTypedCommand("");
      setIsTyping(false);
      onComplete?.();
      return;
    }

    if (!active) {
      setShowContent(false);
      setTypedCommand("");
      setIsTyping(false);
      return;
    }

    setShowContent(false);
    setTypedCommand("");
    setIsTyping(false);

    startTimeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        setTypedCommand(command.slice(0, i + 1));
        i++;
        if (i >= command.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => handleComplete(), 300);
        }
      }, 50);
    }, delay);

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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
      <div className="font-mono text-xs text-terminal-green mb-2 flex items-center gap-1 group/cmd">
        <span className="text-primary">❯</span>
        <span>{typedCommand}</span>
        {isTyping && typedCommand.length < command.length && (
          <span className="animate-blink">▋</span>
        )}
        {isTyping && (
          <button
            onClick={handleSkip}
            className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover/cmd:opacity-100"
            title="Skip animation"
            aria-label="Skip terminal animation"
          >
            <ChevronsRight className="w-3 h-3" />
            <span>skip</span>
          </button>
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
