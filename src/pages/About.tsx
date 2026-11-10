import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  GraduationCap,
  Briefcase,
  Cpu,
  Award,
  Trophy,
  Copy,
  Check,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import {
  personalInfo,
  education,
  career,
  skills,
  certifications,
  achievements,
} from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import { usePageMeta } from "../hooks/usePageMeta";

const RevealSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const { devMode, pushLog } = useMode();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");
  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  usePageMeta({
    title: "About",
    description:
      "Learn about Adhitya Maulana Wijaya (Blue Screen Boy) : Full-Stack Developer & Automation Engineer from Kuningan, West Java. Skills, education, career, and certifications.",
    canonical: "/about",
  });

  useEffect(() => {
    if (devMode) {
      pushLog({ type: "info", msg: "About module loaded." });
      pushLog({ type: "ok", msg: "Skills matrix initialized." });
    }
  }, [devMode, pushLog]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (devMode) {
      pushLog({ type: "ok", msg: "Email copied to clipboard." });
    }
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredSkills =
    activeSkillCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10 max-w-6xl mx-auto space-y-10">
      {/* Bio Overview Hero */}
      <RevealSection delay={0}>
        <div className="rounded-2xl glass-surface p-6 sm:p-8 border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>Full-Stack & Automation Engineer</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  About <span className="text-primary">{personalInfo.name}</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
                  alias: <span className="text-foreground">{personalInfo.alias}</span> | Undergraduate CS Student @ Universitas Kuningan
                </p>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                {personalInfo.bio}
              </p>

              {/* Direct Meta Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/70 border border-white/5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  {personalInfo.location}
                </span>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/70 hover:bg-secondary border border-white/5 text-foreground transition-all hover:border-primary/40 group"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{personalInfo.email}</span>
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-terminal-green shrink-0 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0 ml-1 opacity-60 group-hover:opacity-100" />
                  )}
                </button>

                <a
                  href="/CV-Adhitya_Maulana_Wijaya.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 2-Column Balanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Work Experience & Education Timeline */}
        <div className="lg:col-span-7 space-y-8">
          {/* Work Experience */}
          <RevealSection delay={0.05}>
            <div className="rounded-2xl glass-surface p-6 sm:p-7 border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <h2>Professional Experience</h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-md">
                  {career.length} positions
                </span>
              </div>

              <div className="space-y-6">
                {career.map((job, i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/60 transition-colors group"
                  >
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-sm group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <span className="text-xs font-mono text-primary flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {job.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {job.company}
                    </p>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Education */}
          <RevealSection delay={0.1}>
            <div className="rounded-2xl glass-surface p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg pb-3 border-b border-white/10">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <h2>Formal Education</h2>
              </div>

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 bg-secondary/40 border border-white/5 space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-mono text-primary">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 font-mono">
                    {edu.school}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* Right Column: Skills Matrix, Certifications & Honors */}
        <div className="lg:col-span-5 space-y-8">
          {/* Skills Matrix */}
          <RevealSection delay={0.12}>
            <div className="rounded-2xl glass-surface p-6 sm:p-7 border border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg">
                  <Cpu className="w-4 h-4 text-primary shrink-0" />
                  <h2>Technical Capabilities</h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {filteredSkills.length} skills
                </span>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveSkillCategory(cat)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                      activeSkillCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map((s) => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-secondary/70 text-foreground border border-white/5 hover:border-primary/40 transition-colors"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Certifications */}
          <RevealSection delay={0.16}>
            <div className="rounded-2xl glass-surface p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg pb-3 border-b border-white/10">
                <Award className="w-4 h-4 text-primary shrink-0" />
                <h2>Credentials & Certifications</h2>
              </div>

              <ul className="space-y-2.5">
                {certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-snug p-2 rounded-xl bg-secondary/30 border border-white/5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          {/* Honors & Competition Awards */}
          <RevealSection delay={0.2}>
            <div className="rounded-2xl glass-surface p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg pb-3 border-b border-white/10">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <h2>Competitions & Honors</h2>
              </div>

              <div className="space-y-2.5">
                {achievements.map((ach, i) => {
                  const rankStyles =
                    ach.rank === "1st"
                      ? "bg-amber-400/15 text-amber-400 border-amber-400/30"
                      : ach.rank === "2nd"
                        ? "bg-slate-300/15 text-slate-300 border-slate-300/30"
                        : "bg-amber-700/15 text-amber-500 border-amber-700/30";

                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all"
                    >
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md border shrink-0 ${rankStyles}`}
                      >
                        {ach.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {ach.title}
                        </p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                          {ach.event} | {ach.year}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </div>
  );
};

export default About;
