import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BSODScreenProps {
  active: boolean;
  onComplete: () => void;
}

const BSODScreen = ({ active, onComplete }: BSODScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 3000);
          return 100;
        }
        // Random increment between 3–12 for organic feel
        return Math.min(prev + Math.floor(Math.random() * 10) + 3, 100);
      });
    }, 500);

    return () => clearInterval(interval);
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] bg-primary flex flex-col justify-center px-6 sm:px-16 md:px-24 lg:px-32"
        >
          {/* Sad face */}
          <div className="text-white text-7xl sm:text-8xl md:text-9xl font-light leading-none mb-6 sm:mb-8">
            :(
          </div>

          {/* Main message */}
          <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mb-6 sm:mb-8">
            This system crashed due to too much talent. We're just collecting
            some error info, and then we'll restart for you.
          </p>

          {/* Progress */}
          <p className="text-white text-base sm:text-lg md:text-xl mb-10 sm:mb-16">
            {progress}% complete
          </p>

          {/* Bottom info section */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* QR Code placeholder */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 border-primary-foreground/40 rounded grid grid-cols-5 grid-rows-5 gap-[1px] p-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${
                    [
                      0, 1, 2, 4, 5, 6, 10, 11, 12, 14, 18, 19, 20, 22, 23, 24,
                    ].includes(i)
                      ? "bg-white/80"
                      : "bg-primary-foreground/20"
                  }`}
                />
              ))}
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs space-y-1">
              <p>
                For more information about this issue and possible fixes, visit{" "}
                <span className="text-white/90">
                  https://bluescreenboy.dev/stopcode
                </span>
              </p>
              <p>If you call a support person, give them this info:</p>
              <p>Stop code: TOO_MUCH_TALENT</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BSODScreen;
