import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Radio,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import TerminalReveal from "../components/TerminalReveal";
import { personalInfo } from "../data/portfolio";
import { useMode } from "../context/ModeContext";

const Contact = () => {
  const { devMode, pushLog } = useMode();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email address is required";
    if (!form.message.trim()) e.message = "Message payload cannot be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      if (devMode) {
        pushLog({
          type: "info",
          msg: `Transmitting message from ${form.name}...`,
        });
        pushLog({ type: "ok", msg: "Message transmitted successfully." });
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (devMode) {
      pushLog({ type: "ok", msg: "Direct email copied to clipboard." });
    }
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <WindowFrame
            title={devMode ? "~/sys/contact — transmit.sh" : "~/contact — compose"}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal command="nano ~/contact/compose.msg">
                {submitted ? (
                  <div className="text-center py-10 sm:py-14 space-y-4">
                    <div className="flex justify-center">
                      {devMode ? (
                        <div className="w-16 h-16 rounded-full bg-terminal-green/10 border border-terminal-green/30 flex items-center justify-center">
                          <Radio className="w-8 h-8 text-terminal-green animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        {devMode ? "Packet Transmitted" : "Message Sent Successfully!"}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                        {devMode
                          ? "Payload delivered to direct mailbox queue. System status: ACK received."
                          : "Thank you for reaching out! I will review your inquiry and get back to you shortly."}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-secondary text-foreground text-xs sm:text-sm font-mono hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {devMode ? "$ compose --new" : "Compose another message"}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                          <span className="text-primary text-glow">
                            {devMode ? "Transmit" : "Get in"}
                          </span>{" "}
                          {devMode ? "Message" : "Touch"}
                          {devMode && (
                            <span className="animate-blink text-primary font-mono ml-1">
                              _
                            </span>
                          )}
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {devMode
                            ? "Establish secure connection channel for collaborations, engineering inquiries, or contracts."
                            : "Have a project in mind or looking for a developer? Feel free to drop a message."}
                        </p>
                      </div>

                      {/* Quick Contact Badges */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border/50 text-xs font-mono text-foreground hover:border-primary/40 transition-all group"
                          title="Copy email to clipboard"
                        >
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <span className="hidden sm:inline">Copy Email</span>
                          {copiedEmail ? (
                            <Check className="w-3.5 h-3.5 text-terminal-green" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary opacity-60 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            className={`text-xs font-mono mb-1.5 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}
                          >
                            {devMode ? "sender.name" : "Your Name"}
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder={devMode ? "string (e.g. John Doe)" : "Adhitya Maulana"}
                            className={`w-full px-3.5 py-2.5 rounded-lg border text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                              devMode
                                ? "bg-terminal-bg border-primary/25 focus:ring-terminal-green"
                                : "bg-secondary/70 border-border focus:ring-primary"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive mt-1 font-mono">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className={`text-xs font-mono mb-1.5 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}
                          >
                            {devMode ? "sender.email" : "Your Email"}
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder={
                              devMode
                                ? "string (valid_email)"
                                : "you@example.com"
                            }
                            className={`w-full px-3.5 py-2.5 rounded-lg border text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                              devMode
                                ? "bg-terminal-bg border-primary/25 focus:ring-terminal-green"
                                : "bg-secondary/70 border-border focus:ring-primary"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1 font-mono">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          className={`text-xs font-mono mb-1.5 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}
                        >
                          {devMode ? "message.subject" : "Subject (Optional)"}
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          placeholder={devMode ? "string | null" : "Project Inquiry / Collaboration"}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-all ${
                            devMode
                              ? "bg-terminal-bg border-primary/25 focus:ring-terminal-green"
                              : "bg-secondary/70 border-border focus:ring-primary"
                          }`}
                        />
                      </div>

                      <div>
                        <label
                          className={`text-xs font-mono mb-1.5 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}
                        >
                          {devMode ? "payload.body" : "Message Body"}
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder={
                            devMode
                              ? "string (required payload details...)"
                              : "Tell me about your project, goals, or questions..."
                          }
                          rows={5}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 resize-none transition-all ${
                            devMode
                              ? "bg-terminal-bg border-primary/25 focus:ring-terminal-green"
                              : "bg-secondary/70 border-border focus:ring-primary"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive mt-1 font-mono">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          type="submit"
                          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                            devMode
                              ? "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30 border border-terminal-green/30 dev-border-glow"
                              : "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          {devMode ? "$ transmit" : "Send Message"}
                        </button>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                          <span>Connect on:</span>
                          <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            title="GitHub Profile"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

