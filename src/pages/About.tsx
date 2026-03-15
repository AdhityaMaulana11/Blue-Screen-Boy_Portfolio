import { useEffect } from "react";
import { motion } from "framer-motion";
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
  const categories = [...new Set(skills.map((s) => s.category))];
  const { isActive, onComplete } = useSequentialReveal(6);

  useEffect(() => {
    if (devMode) {
      pushLog({ type: "info", msg: "About module loaded." });
      pushLog({ type: "ok", msg: "Skills matrix initialized." });
    }
  }, [devMode, pushLog]);

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WindowFrame
            title={devMode ? "~/sys/about — bio.md" : "~/about — bio.md"}
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8 space-y-4">
              <TerminalReveal
                command="cat ~/about/bio.md"
                active={isActive(0)}
                onComplete={onComplete(0)}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  About{" "}
                  <span className="text-primary text-glow">
                    {personalInfo.alias}
                  </span>
                  {devMode && (
                    <span className="animate-blink text-primary font-mono">
                      _
                    </span>
                  )}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
                  {personalInfo.bio}
                </p>
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-mono text-muted-foreground mt-3">
                  <span>📍 {personalInfo.location}</span>
                  <span>📧 {personalInfo.email}</span>
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <WindowFrame
            title={
              devMode
                ? "~/sys/about — education.json"
                : "~/about — education.json"
            }
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="cat ~/about/education.json"
                active={isActive(1)}
                onComplete={onComplete(1)}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  🎓 Education
                </h2>
                {education.map((edu, i) => (
                  <div key={i} className="glass-surface rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary font-mono">
                      {edu.school}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.year} — {edu.description}
                    </p>
                  </div>
                ))}
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <WindowFrame
            title={
              devMode ? "~/sys/about — career.log" : "~/about — career.log"
            }
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="cat ~/about/career.log"
                active={isActive(2)}
                onComplete={onComplete(2)}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  💼 Work Experience
                </h2>
                <div className="space-y-4">
                  {career.map((job, i) => (
                    <div
                      key={i}
                      className="relative pl-5 sm:pl-6 border-l-2 border-primary/30"
                    >
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(210,100%,56%,0.5)]" />
                      <h3 className="font-semibold text-sm sm:text-base text-foreground">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-primary font-mono">
                        {job.company} • {job.period}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <WindowFrame
            title={
              devMode
                ? "~/sys/about — skills.config"
                : "~/about — skills.config"
            }
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="cat ~/about/skills.config"
                active={isActive(3)}
                onComplete={onComplete(3)}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">⚡ Skills</h2>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat}>
                      <p className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                        {cat}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {skills
                          .filter((s) => s.category === cat)
                          .map((s) => (
                            <span
                              key={s.name}
                              className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-mono transition-colors cursor-default ${
                                devMode
                                  ? "bg-primary/10 text-primary hover:bg-primary/25 dev-border-glow"
                                  : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
                              }`}
                            >
                              {s.name}
                            </span>
                          ))}
                      </div>
                    </div>
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
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <WindowFrame
            title={
              devMode
                ? "~/sys/about — certs.list"
                : "~/about — certifications.list"
            }
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="ls ~/certs/"
                active={isActive(4)}
                onComplete={onComplete(4)}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  📜 Certifications
                </h2>
                <ul className="space-y-2">
                  {certifications.map((cert, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">▸</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <WindowFrame
            title={
              devMode
                ? "~/sys/about — achievements.trophy"
                : "~/about — achievements.trophy"
            }
            className={devMode ? "dev-border-glow" : ""}
          >
            <div className="p-5 sm:p-8">
              <TerminalReveal
                command="cat ~/achievements.trophy"
                active={isActive(5)}
                onComplete={onComplete(5)}
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  🏆 Achievements
                </h2>
                <ul className="space-y-2">
                  {achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      {ach}
                    </li>
                  ))}
                </ul>
              </TerminalReveal>
            </div>
          </WindowFrame>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
