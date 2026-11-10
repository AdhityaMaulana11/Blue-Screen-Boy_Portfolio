import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import WindowFrame from "../components/WindowFrame";
import TerminalReveal from "../components/TerminalReveal";
import {
  personalInfo,
  education,
  career,
  skills,
  certifications,
  achievements,
} from "../data/portfolio";
import { useMode } from "../context/ModeContext";
import useSequentialReveal from "../hooks/useSequentialReveal";

const About = () => {
  const { devMode, pushLog } = useMode();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");
  const categories = ["All", ...new Set(skills.map((s) => s.category))];
  const { isActive, onComplete } = useSequentialReveal(5);

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
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header / Bio Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WindowFrame
            title={devMode ? "~/sys/about — bio.md" : "~/about — bio.md"}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="cat ~/about/bio.md"
                active={isActive(0)}
                onComplete={onComplete(0)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                      <span>Full-Stack & Automation Engineer</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      About{" "}
                      <span className="text-primary text-glow">
                        {personalInfo.name}
                      </span>
                      {devMode && (
                        <span className="animate-blink text-primary font-mono ml-1">
                          _
                        </span>
                      )}
                    </h1>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {personalInfo.bio}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm font-mono text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/60 border border-border/50">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        {personalInfo.location}
                      </span>

                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/60 hover:bg-secondary border border-border/50 text-foreground transition-all hover:border-primary/40 group"
                        title="Copy email to clipboard"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 transition-all font-sans text-xs font-medium"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" /> Download CV
                      </a>
                    </div>
                  </div>
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Experience & Education Timeline */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <WindowFrame
                title={
                  devMode ? "~/sys/about — career.log" : "~/about — career.log"
                }
                className={devMode ? "dev-border-glow" : ""}
              >
                <div className="p-5 sm:p-7">
                  <TerminalReveal
                    command="cat ~/about/career.log"
                    active={isActive(1)}
                    onComplete={onComplete(1)}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        <h2>Work Experience</h2>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {career.length} roles
                      </span>
                    </div>

                    <div className="space-y-5">
                      {career.map((job, i) => (
                        <div
                          key={i}
                          className="relative pl-5 sm:pl-6 border-l-2 border-primary/25 hover:border-primary/60 transition-colors group"
                        >
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(210,100%,56%,0.6)] group-hover:scale-125 transition-transform" />

                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <span className="text-[11px] sm:text-xs font-mono text-primary/90 flex items-center gap-1">
                              <Calendar className="w-3 h-3 shrink-0" />
                              {job.period}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-0.5">
                            {job.company}
                          </p>

                          <p className="text-xs sm:text-sm text-muted-foreground/90 mt-2 leading-relaxed">
                            {job.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TerminalReveal>
                </div>
              </WindowFrame>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <WindowFrame
                title={
                  devMode
                    ? "~/sys/about — education.json"
                    : "~/about — education.json"
                }
                className={devMode ? "dev-border-glow" : ""}
              >
                <div className="p-5 sm:p-7">
                  <TerminalReveal
                    command="cat ~/about/education.json"
                    active={isActive(2)}
                    onComplete={onComplete(2)}
                  >
                    <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg mb-4">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                      <h2>Education</h2>
                    </div>

                    {education.map((edu, i) => (
                      <div
                        key={i}
                        className="glass-surface rounded-xl p-4 sm:p-5 border border-border/60 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground">
                            {edu.degree}
                          </h3>
                          <span className="text-[11px] sm:text-xs font-mono text-primary">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-primary font-mono mt-0.5">
                          {edu.school}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          {edu.description}
                        </p>
                      </div>
                    ))}
                  </TerminalReveal>
                </div>
              </WindowFrame>
            </motion.div>
          </div>

          {/* Right Column: Skills Matrix, Certifications & Honors */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Technical Skills Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <WindowFrame
                title={
                  devMode
                    ? "~/sys/about — skills.config"
                    : "~/about — skills.config"
                }
                className={devMode ? "dev-border-glow" : ""}
              >
                <div className="p-5 sm:p-6">
                  <TerminalReveal
                    command="cat ~/about/skills.config"
                    active={isActive(3)}
                    onComplete={onComplete(3)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg">
                        <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        <h2>Technical Skills</h2>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                        {filteredSkills.length} techs
                      </span>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-border/40">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveSkillCategory(cat)}
                          className={`text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-md transition-all ${
                            activeSkillCategory === cat
                              ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                              : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {filteredSkills.map((s) => (
                        <span
                          key={s.name}
                          className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-mono transition-all cursor-default ${
                            devMode
                              ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 dev-border-glow"
                              : "bg-secondary text-secondary-foreground hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-transparent"
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </TerminalReveal>
                </div>
              </WindowFrame>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <WindowFrame
                title={
                  devMode
                    ? "~/sys/about — certs.list"
                    : "~/about — certifications.list"
                }
                className={devMode ? "dev-border-glow" : ""}
              >
                <div className="p-5 sm:p-6">
                  <TerminalReveal
                    command="ls ~/certs/"
                    active={isActive(4)}
                    onComplete={onComplete(4)}
                  >
                    <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg mb-3">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                      <h2>Certifications</h2>
                    </div>

                    <ul className="space-y-2.5">
                      {certifications.map((cert, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-snug p-2 rounded-lg hover:bg-secondary/40 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_hsl(210,100%,56%,0.6)]" />
                          <span className="text-foreground/90">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </TerminalReveal>
                </div>
              </WindowFrame>
            </motion.div>

            {/* Honors & Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <WindowFrame
                title={
                  devMode
                    ? "~/sys/about — achievements.trophy"
                    : "~/about — achievements.trophy"
                }
                className={devMode ? "dev-border-glow" : ""}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg mb-3">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                    <h2>Honors & Competitions</h2>
                  </div>

                  <div className="space-y-2.5">
                    {achievements.map((ach, i) => {
                      const rankStyles =
                        ach.rank === "1st"
                          ? "bg-amber-400/15 text-amber-400 border-amber-400/30"
                          : ach.rank === "2nd"
                            ? "bg-slate-300/15 text-slate-300 border-slate-300/30"
                            : "bg-amber-700/15 text-amber-600 border-amber-700/30";

                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-secondary/30 border border-border/40 hover:border-primary/30 transition-all"
                        >
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border shrink-0 ${rankStyles}`}
                          >
                            {ach.rank}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-foreground">
                              {ach.title}
                            </p>
                            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                              {ach.event} • {ach.year}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </WindowFrame>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

