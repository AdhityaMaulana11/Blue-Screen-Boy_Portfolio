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
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import { usePageMeta } from "../hooks/usePageMeta";

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

  usePageMeta({
    title: "Contact",
    description:
      "Get in touch with Adhitya Maulana Wijaya (Blue Screen Boy) : available for freelance projects, collaborations, and engineering inquiries.",
    canonical: "/contact",
  });

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
    if (!validate()) return;

    const subject = encodeURIComponent(
      form.subject || `Portfolio Contact from ${form.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    if (devMode) {
      pushLog({
        type: "info",
        msg: `Transmitting message from ${form.name}...`,
      });
      pushLog({ type: "ok", msg: "mailto: channel opened." });
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
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10 max-w-5xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl glass-surface p-6 sm:p-8 md:p-10 border border-white/10"
      >
        {submitted ? (
          <div className="text-center py-12 sm:py-16 space-y-5">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Message Initialized Successfully
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Your email client has opened with your composed message. Send it directly from your inbox, and I will get back to you within 24 hours.
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
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-secondary text-foreground text-xs sm:text-sm font-mono hover:bg-secondary/80 border border-white/5 transition-all"
            >
              <Send className="w-4 h-4 text-primary" />
              Compose another message
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Contact Info & Status */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Available for Opportunities</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Get in Touch
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Have a full-stack project, automation pipeline, or engineering opportunity in mind? Drop a message below.
                </p>
              </div>

              {/* Status pills */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50 border border-white/5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                  <span className="text-foreground">Available for contract & full-time</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/30 border border-white/5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/30 border border-white/5 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>

              {/* Direct email copy */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  Direct Inquiries
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-secondary/60 hover:bg-secondary border border-white/5 text-xs font-mono text-foreground hover:border-primary/40 transition-all group w-full"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-terminal-green shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                  )}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  Professional Profiles
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-white/5 text-xs font-mono text-foreground transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-primary shrink-0" />
                      <span>GitHub</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-white/5 text-xs font-mono text-foreground transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-primary shrink-0" />
                      <span>LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground block">
                      Your Name
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
                      placeholder="Adhitya Maulana"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-secondary/50 text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive font-mono">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground block">
                      Your Email
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
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-secondary/50 text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive font-mono">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground block">
                    Subject (Optional)
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
                    placeholder="Project Inquiry / Engineering Role"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-secondary/50 text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground block">
                    Message Payload
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Describe your project, timelines, or role requirements..."
                    rows={5}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-secondary/50 text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive font-mono">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <p className="text-[11px] font-mono text-muted-foreground mt-2">
                    Directly opens a pre-filled mailto channel to adhityamaulanawijaya11@gmail.com
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;
