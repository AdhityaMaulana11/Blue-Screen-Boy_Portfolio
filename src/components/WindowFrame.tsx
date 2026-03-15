import { ReactNode } from "react";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "terminal";
  onClose?: () => void;
}

const WindowFrame = ({
  title,
  children,
  className = "",
  variant = "default",
  onClose,
}: WindowFrameProps) => {
  return (
    <div
      className={`rounded-lg overflow-hidden window-shadow ${variant === "terminal" ? "terminal-glow" : "glass-glow"} ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-window-header border-b border-border/50">
        <div className="flex gap-1.5">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-window-red hover:brightness-110 transition-all"
            aria-label="Close"
          />
          <div className="w-3 h-3 rounded-full bg-window-yellow" />
          <div className="w-3 h-3 rounded-full bg-window-green" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2 select-none">
          {title}
        </span>
      </div>
      <div
        className={
          variant === "terminal"
            ? "bg-terminal-bg"
            : "bg-card/80 backdrop-blur-sm"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
