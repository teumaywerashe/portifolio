import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiExternalLink, FiLayers, FiGithub, FiCpu } from "react-icons/fi";
import useTheme from "../context/ThemeContext";
import "./Projects.css";
import { projectsData } from "../data/Projects";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Projects = () => {
  const { theme, isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const particles = Array.from({ length: 35 });

  return (
    <section
      id="projects"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative items-center justify-center  py-24  px-6 md:px-16 lg:px-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 projects-particles">
        {particles.map((_, i) => {
          const size = Math.random() * 7 + 3;
          const duration = Math.random() * 12 + 8;
          const delay = Math.random() * 10;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full particle"
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

      <motion.div
        className="mb-12 mx-50 text-center md:text-left"
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
        className="grid mx-auto max-w-7xl grid-cols-1 md:grid-cols-3 gap-8"
        initial="initial"
        animate="animate"
      >
        {projectsData.map((project) => (
          <motion.article
            key={project.title}
            className="rounded-lg shadow-md p-6 border transition-colors duration-500"
            style={{
              background: isDarkMode ? theme.surface : theme.background,
              borderColor: isDarkMode ? theme.border : "#e5e7eb",
              boxShadow: isDarkMode
                ? "0 2px 16px 0 rgba(31,41,55,0.4)"
                : "0 2px 16px 0 rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="relative aspect-video mb-4 rounded-lg overflow-hidden border"
              style={{ borderColor: isDarkMode ? theme.border : "#e5e7eb" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  background: isDarkMode ? theme.background : "#f3f4f6",
                }}
              />
            </div>

            <motion.h3
              className="text-xl font-semibold mb-2"
              style={{ color: theme.textMain }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="mb-4"
              style={{ color: theme.textSecondary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 rounded-full text-sm border"
                  style={{
                    background: isDarkMode ? theme.primary + "22" : "#eef2ff",
                    color: theme.primary,
                    borderColor: isDarkMode ? theme.primary + "55" : "#c7d2fe",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors"
                style={{ color: theme.textSecondary }}
                whileHover={{ x: 5, color: theme.primary }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="h-5 w-5" />
                <span>Code</span>
              </motion.a>

              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors"
                style={{ color: theme.textSecondary }}
                whileHover={{ x: 5, color: theme.primary }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt className="h-5 w-5" />
                <span>Live Demo</span>
              </motion.a>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
