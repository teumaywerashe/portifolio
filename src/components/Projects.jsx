import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiExternalLink,
  FiLayers,
  FiMessageSquare,
  FiCpu,
} from "react-icons/fi";
import useTheme from "../context/ThemeContext";

const Projects = () => {
  const { theme, isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projectsData = [
    {
      title: "Resource Hub",
      description:
        "A web based platform where students can find the details of all the ethiopian universities and the cources and departments they give",
      link: "https://resourcehub-1.onrender.com/",
      tech: ["React", "Node.js","MongoDB Atlass", "RestAPI"],
      type: "personal project",
    },
    {
      title: "campus facility management",
      description:
        "A web based platform where students and stuff of a campus can report issue that they see in the campus",
      link: "https://campusfacilitymanagement-1.onrender.com",
      tech: ["TailwindCss", "React", "MongoDB", "Node.js"],
      type: "Real-time Chat",
      specialIcon: <FiMessageSquare />,
    },
    {
      title: "Food delivery",
      description:
        "A web based food delivery app where users  can order a food and make there payment through chapa ",
      link: "https://fullstack-food-delivery-1.onrender.com/",
      tech: ["MERN Stack", "MongoDB", "Tailwind"],
      type: "Commerce",
    },
    // {
    //   title: "NoteForge",
    //   description:
    //     "Professional note-taking software with markdown support and organizational workspace features.",
    //   link: "https://noteforge-rizu.vercel.app",
    //   tech: ["React", "mongoDB", "RestAPIs", "TailwindCSS"],
    //   type: "Software / SaaS",
    // },
    // {
    //   title: "Zaant AI",
    //   description:
    //     "Modern AI landing page and dashboard frontend with high-performance animations.",
    //   link: "https://zaant.vercel.app",
    //   tech: ["React", "Google Gemini API", "TailwindCSS", "mongoDB"],
    //   type: "Frontend",
    // },
  ];

  const particles = Array.from({ length: 35 });

  return (
    <section
      id="projects"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative py-24 px-6 md:px-16 lg:px-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((_, i) => {
          const size = Math.random() * 7 + 3;
          const duration = Math.random() * 12 + 8;
          const delay = Math.random() * 10;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: theme.primary,
                width: size,
                height: size,
                left: Math.random() * 100 + "%",
                filter: `blur(${size / 2.5}px)`,
                boxShadow: `0 0 ${size * 3}px ${theme.primary}80`,
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: [0, 1200],
                opacity: [0, 0.7, 0.7, 0],
                x: [0, Math.random() * 60 - 30, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: -delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          className="mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2
            style={{ color: theme.textMain }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase"
          >
            Featured <span style={{ color: theme.primary }}>Work.</span>
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto md:mx-0"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-10 p-8 md:p-12 rounded-[3rem] border-2 border-dashed relative overflow-hidden group"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surface + "90",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div
                style={{
                  backgroundColor: theme.primary + "20",
                  color: theme.primary,
                }}
                className="p-4 rounded-2xl text-3xl"
              >
                <FiCpu />
              </div>
              <div className="text-center md:text-left">
                <p
                  style={{ color: theme.primary }}
                  className="font-bold uppercase text-[10px] tracking-[0.4em] mb-1"
                >
                  Active Environment
                </p>
                <h4
                  style={{ color: theme.textMain }}
                  className="text-2xl md:text-3xl font-black italic"
                >
                  Teumay Werashe Portfolio
                </h4>
              </div>
            </div>
            <a
              href="https://TeumayWerasheportfolio.netlify.app"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
                zIndex: 20,
              }}
              className="px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg relative"
            >
              Current Link <FiExternalLink />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.6 }}
              whileHover={{ y: -12 }}
              style={{
                backgroundColor: theme.surface + "cc",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.border}`,
                boxShadow: isDarkMode
                  ? "0 25px 50px -12px rgba(0,0,0,0.5)"
                  : "0 25px 50px -12px rgba(0,0,0,0.08)",
              }}
              className="group rounded-[3rem] p-8 md:p-12 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity"></div>
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div
                    style={{
                      backgroundColor: theme.primary + "15",
                      color: theme.primary,
                    }}
                    className="p-5 rounded-[1.5rem] text-3xl shadow-inner"
                  >
                    {project.specialIcon || <FiLayers />}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: theme.textMain,
                      backgroundColor: theme.border + "30",
                      zIndex: 20,
                    }}
                    className="hover:scale-110 transition-transform p-3 rounded-full border border-transparent hover:border-indigo-500 relative"
                  >
                    <FiExternalLink size={22} />
                  </a>
                </div>
                <p
                  style={{ color: theme.primary }}
                  className="text-[10px] font-black uppercase tracking-[0.3em] mb-3"
                >
                  {project.type}
                </p>
                <h3
                  style={{ color: theme.textMain }}
                  className="text-3xl font-black mb-5 tracking-tight group-hover:text-indigo-400 transition-colors"
                >
                  {project.title}
                </h3>
                <p
                  style={{ color: theme.textSecondary }}
                  className="text-lg leading-relaxed mb-8 opacity-90 font-medium"
                >
                  {project.description}
                </p>
              </div>
              <div
                className="flex flex-wrap gap-2 mt-auto pt-8 border-t"
                style={{ borderColor: theme.border }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-bold px-4 py-1.5 rounded-full border"
                    style={{
                      borderColor: theme.border,
                      color: theme.textSecondary,
                      backgroundColor: theme.background,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
