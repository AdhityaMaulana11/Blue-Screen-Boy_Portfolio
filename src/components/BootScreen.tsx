import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: "Booting Blue Screen Boy OS v1.0...", delay: 0 },
  { text: "Loading modules...", delay: 300 },
  { text: "✔ React Engine initialized", delay: 600 },
  { text: "✔ Automation Layer activated", delay: 900 },
  { text: "✔ Portfolio Interface ready", delay: 1100 },
  { text: "", delay: 1300 },
  { text: "Welcome, visitor.", delay: 1350 },
];

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });

    timers.push(setTimeout(() => setFading(true), 1600));
    timers.push(setTimeout(() => onComplete(), 2000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="font-mono text-sm space-y-1 max-w-md px-6">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.text.startsWith("✔")
                    ? "text-terminal-green"
                    : line.text === "Welcome, visitor."
                    ? "text-primary text-glow mt-2"
                    : "text-muted-foreground"
                }
              >
                {line.text}
              </motion.div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="text-terminal-green animate-blink">▋</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
