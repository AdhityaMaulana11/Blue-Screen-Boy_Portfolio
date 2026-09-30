import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

export interface SystemLog {
  type: "info" | "ok" | "warn" | "error";
  msg: string;
  timestamp?: number;
}

interface ModeContextType {
  devMode: boolean;
  setDevMode: (v: boolean) => void;
  toggleDevMode: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  toggleTerminal: () => void;
  systemLogs: SystemLog[];
  pushLog: (log: SystemLog) => void;
  clearLogs: () => void;
  transitioning: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const ModeContext = createContext<ModeContextType | null>(null);

export const useMode = (): ModeContextType => {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
};

/** Play a short retro synth beep via Web Audio API */
function playBeep(type: "on" | "off" | "click") {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "on") {
      // Two-tone ascending chime for entering Dev Mode
      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "off") {
      // Descending tone for exiting Dev Mode
      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(260, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else {
      // Quick click for nav / terminal toggle
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch {
    // Silently fail if Web Audio API unavailable
  }
}

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [devMode, setDevModeState] = useState(
    () => localStorage.getItem("bsb-mode") === "dev",
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(
    () => localStorage.getItem("bsb-sound") !== "off",
  );
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("bsb-sound", next ? "on" : "off");
      return next;
    });
  }, []);

  const setDevMode = useCallback(
    (v: boolean) => {
      if (soundEnabled) playBeep(v ? "on" : "off");
      setTransitioning(true);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        setDevModeState(v);
        localStorage.setItem("bsb-mode", v ? "dev" : "gui");
        setTimeout(() => setTransitioning(false), 400);
      }, 300);
    },
    [soundEnabled],
  );

  const toggleDevMode = useCallback(() => {
    setDevMode(!devMode);
  }, [devMode, setDevMode]);

  const toggleTerminal = useCallback(() => {
    if (soundEnabled) playBeep("click");
    setTerminalOpen((p) => !p);
  }, [soundEnabled]);

  const pushLog = useCallback((log: SystemLog) => {
    setSystemLogs((prev) => [
      ...prev.slice(-49),
      { ...log, timestamp: Date.now() },
    ]);
  }, []);

  const clearLogs = useCallback(() => setSystemLogs([]), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleTerminal();
      }
      if (e.key === "Escape" && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [terminalOpen, toggleTerminal]);

  return (
    <ModeContext.Provider
      value={{
        devMode,
        setDevMode,
        toggleDevMode,
        terminalOpen,
        setTerminalOpen,
        toggleTerminal,
        systemLogs,
        pushLog,
        clearLogs,
        transitioning,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};
