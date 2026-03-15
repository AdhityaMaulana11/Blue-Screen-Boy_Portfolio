import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WindowFrame from "./WindowFrame";
import BSODScreen from "./BSODScreen";
import {
  personalInfo,
  education,
  career,
  skills,
  projects,
} from "../data/portfolio";
import { useMode } from "../context/ModeContext";

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "info";
  text: string;
}

const COMMANDS = [
  "help",
  "whois",
  "about",
  "skills",
  "projects",
  "open",
  "contact",
  "clear",
  "cv",
  "bsod",
  "filter",
];

const SUGGESTIONS = [
  { label: "projects", desc: "List all projects" },
  { label: "whois", desc: "Who am I?" },
  { label: "skills", desc: "My tech stack" },
  { label: "open cms-aisee", desc: "View project" },
];

const DEV_BOOT_LINES: TerminalLine[] = [
  { type: "info", text: "Booting Blue Screen Boy OS v2.0..." },
  { type: "output", text: "Initializing React Engine..." },
  { type: "output", text: "Mounting Automation Layer..." },
  { type: "success", text: "✔ System Ready.\n" },
];

const TerminalWidget = () => {
  const { terminalOpen, setTerminalOpen, devMode, systemLogs } = useMode();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: `Welcome to Blue Screen Boy Terminal v1.0.0` },
    { type: "info", text: `Type "help" to see available commands.\n` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [bsodActive, setBsodActive] = useState(false);
  const [hasBootedDev, setHasBootedDev] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const prevLogCount = useRef(0);

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Dev mode boot sequence
  useEffect(() => {
    if (devMode && !hasBootedDev) {
      setHasBootedDev(true);
      DEV_BOOT_LINES.forEach((line, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, i * 300);
      });
    }
    if (!devMode) {
      setHasBootedDev(false);
    }
  }, [devMode, hasBootedDev]);

  // Auto-log system events in dev mode
  useEffect(() => {
    if (!devMode) return;
    if (systemLogs.length > prevLogCount.current) {
      const newLogs = systemLogs.slice(prevLogCount.current);
      newLogs.forEach((log) => {
        setLines((prev) => [
          ...prev,
          {
            type:
              log.type === "ok"
                ? "success"
                : log.type === "warn"
                  ? "error"
                  : log.type === "error"
                    ? "error"
                    : "info",
            text: `[SYS] ${log.msg}`,
          },
        ]);
      });
    }
    prevLogCount.current = systemLogs.length;
  }, [systemLogs, devMode]);

  const addLine = useCallback(
    (text: string, type: TerminalLine["type"] = "output") => {
      setLines((prev) => [...prev, { type, text }]);
    },
    [],
  );

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(/\s+/);
      const command = parts[0];

      setLines((prev) => [...prev, { type: "input", text: `❯ ${cmd}` }]);
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIdx(-1);
      setShowSuggestions(false);

      switch (command) {
        case "help":
          addLine(
            `Available commands:
  help           — Show this help
  whois          — Short bio + CV link
  about          — Education & career summary
  skills         — List skills
  projects       — List all projects
  open <id>      — Open project detail
  filter --tech  — Filter by technology
  contact        — Open contact page
  cv             — Download CV
  clear          — Clear terminal`,
            "info",
          );
          break;
        case "whois":
          addLine(
            `${personalInfo.name} aka "${personalInfo.alias}"
${personalInfo.tagline}
📍 ${personalInfo.location}
📧 ${personalInfo.email}
🔗 ${personalInfo.github}`,
            "success",
          );
          break;
        case "about":
          addLine(`── Education ──`, "info");
          education.forEach((e) =>
            addLine(`  ${e.degree} @ ${e.school} (${e.year})`),
          );
          addLine(`\n── Career ──`, "info");
          career.forEach((c) =>
            addLine(`  ${c.title} @ ${c.company} (${c.period})`),
          );
          break;
        case "skills": {
          const categories = [...new Set(skills.map((s) => s.category))];
          categories.forEach((cat) => {
            const items = skills
              .filter((s) => s.category === cat)
              .map((s) => s.name)
              .join(", ");
            addLine(`  [${cat}] ${items}`, "info");
          });
          break;
        }
        case "projects":
          projects.forEach((p) => {
            addLine(`  ${p.id.padEnd(22)} ${p.year}  ${p.title}`);
          });
          addLine(`\nUse "open <id>" to view details.`, "info");
          break;
        case "open":
          if (parts[1]) {
            const project = projects.find((p) => p.id === parts[1]);
            if (project) {
              addLine(`Opening ${project.title}...`, "success");
              if (devMode) {
                addLine(`Loading architecture modules...`, "info");
                addLine(`Rendering interface...`, "info");
              }
              setTimeout(
                () => navigate(`/projects/${project.id}`),
                devMode ? 800 : 500,
              );
            } else {
              addLine(
                `Error: project "${parts[1]}" not found. Try "projects" to list.`,
                "error",
              );
            }
          } else {
            addLine(`Usage: open <project-id>`, "error");
          }
          break;
        case "filter":
          if (parts[1] === "--tech" && parts[2]) {
            addLine(`Filtering projects by: ${parts[2]}`, "success");
            setTimeout(() => navigate(`/projects?tech=${parts[2]}`), 500);
          } else {
            addLine(`Usage: filter --tech <technology>`, "error");
          }
          break;
        case "contact":
          addLine("Opening contact page...", "success");
          setTimeout(() => navigate("/contact"), 500);
          break;
        case "cv":
          addLine("📄 Downloading CV...", "success");
          window.open("/CV-Adhitya_Maulana_Wijaya.pdf", "_blank");
          break;
        case "bsod":
          setBsodActive(true);
          break;
        case "clear":
          setLines([]);
          setShowSuggestions(true);
          break;
        default:
          if (trimmed) {
            addLine(
              `Command not found: "${command}". Type "help" for available commands.`,
              "error",
            );
          }
      }
    },
    [addLine, navigate, devMode],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.filter((c) => c.startsWith(input.toLowerCase()));
      if (match.length === 1) setInput(match[0]);
      else if (match.length > 1) addLine(match.join("  "), "info");
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-terminal-green";
      case "error":
        return "text-destructive";
      case "success":
        return "text-terminal-green";
      case "info":
        return "text-primary";
      default:
        return "text-foreground/80";
    }
  };

  return (
    <>
      {/* BSOD Easter Egg */}
      <BSODScreen active={bsodActive} onComplete={() => setBsodActive(false)} />

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-16 right-3 left-3 sm:left-auto sm:right-4 sm:w-[520px] z-50"
            role="dialog"
            aria-label="Terminal"
          >
            <WindowFrame
              title="~/terminal — bash"
              variant="terminal"
              onClose={() => setTerminalOpen(false)}
            >
              <div
                ref={scrollRef}
                className="p-3 sm:p-4 h-64 sm:h-72 md:h-80 overflow-y-auto font-mono text-xs sm:text-sm select-text"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap leading-relaxed ${lineColor(line.type)}`}
                  >
                    {line.text}
                  </div>
                ))}

                {showSuggestions && (
                  <div className="mt-3 mb-2">
                    <p className="text-muted-foreground text-xs mb-2">
                      Try one of these:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => processCommand(s.label)}
                          className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                          title={s.desc}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-primary">❯</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-terminal-text outline-none caret-terminal-green text-xs sm:text-sm"
                    autoFocus
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalWidget;
