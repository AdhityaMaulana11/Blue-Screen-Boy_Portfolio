import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import { personalInfo } from "../data/portfolio";
import { useMode } from "../context/ModeContext";

const Contact = () => {
  const { devMode, pushLog } = useMode();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      if (devMode) {
        pushLog({ type: "info", msg: `Transmitting message from ${form.name}...` });
        pushLog({ type: "ok", msg: "Message transmitted successfully." });
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <WindowFrame title={devMode ? "~/sys/contact — transmit" : "~/contact — compose"} className={devMode ? "dev-border-glow" : ""}>
            <div className="p-5 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 sm:py-10">
                  <div className="text-4xl mb-4">{devMode ? "📡" : "✅"}</div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {devMode ? "Message Transmitted" : "Message Sent!"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {devMode ? "Packet delivered. Awaiting response..." : "Thank you! I will get back to you soon."}
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-4 text-sm font-mono text-primary hover:underline">
                    {devMode ? "$ compose --new" : "Send another message →"}
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl sm:text-2xl font-bold mb-1">
                    <span className="text-primary text-glow">{devMode ? "Transmit" : "Contact"}</span> {devMode ? "Message" : "Me"}
                    {devMode && <span className="animate-blink text-primary font-mono">_</span>}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                    {devMode ? (
                      <>Direct line: <a href={`mailto:${personalInfo.email}`} className="text-terminal-green hover:underline font-mono">{personalInfo.email}</a></>
                    ) : (
                      <>Or email me directly at <a href={`mailto:${personalInfo.email}`} className="text-primary hover:underline">{personalInfo.email}</a></>
                    )}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { key: "name", label: devMode ? "sender.name" : "Name", type: "text", placeholder: devMode ? "string" : "Full name" },
                      { key: "email", label: devMode ? "sender.email" : "Email", type: "email", placeholder: devMode ? "string (valid)" : "email@example.com" },
                      { key: "subject", label: devMode ? "subject" : "Subject", type: "text", placeholder: devMode ? "string | null" : "Optional" },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className={`text-xs font-mono mb-1 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}>{label}</label>
                        <input
                          type={type}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className={`w-full px-3 py-2 rounded-md border text-foreground text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${
                            devMode
                              ? "bg-terminal-bg border-primary/20 focus:ring-terminal-green"
                              : "bg-secondary border-border focus:ring-primary"
                          }`}
                        />
                        {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className={`text-xs font-mono mb-1 block ${devMode ? "text-terminal-green" : "text-muted-foreground"}`}>{devMode ? "payload" : "Message"}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder={devMode ? "string (required)" : "Write your message..."}
                        rows={5}
                        className={`w-full px-3 py-2 rounded-md border text-foreground text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 resize-none transition-colors ${
                          devMode
                            ? "bg-terminal-bg border-primary/20 focus:ring-terminal-green"
                            : "bg-secondary border-border focus:ring-primary"
                        }`}
                      />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                        devMode
                          ? "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30 dev-border-glow"
                          : "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25"
                      }`}
                    >
                      <Send className="w-4 h-4" /> {devMode ? "$ transmit" : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </WindowFrame>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
