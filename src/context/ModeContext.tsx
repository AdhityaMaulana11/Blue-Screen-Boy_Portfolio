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
}

const ModeContext = createContext<ModeContextType | null>(null);

export const useMode = (): ModeContextType => {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
};

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [devMode, setDevModeState] = useState(
    () => localStorage.getItem("bsb-mode") === "dev",
  );
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  const setDevMode = useCallback((v: boolean) => {
    setTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setDevModeState(v);
      localStorage.setItem("bsb-mode", v ? "dev" : "gui");
      setTimeout(() => setTransitioning(false), 400);
    }, 300);
  }, []);

  const toggleDevMode = useCallback(() => {
    setDevMode(!devMode);
  }, [devMode, setDevMode]);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen((p) => !p);
  }, []);

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
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};
