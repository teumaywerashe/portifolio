"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import useTheme from "../context/ThemeContext";
import { projectsData } from "../data/Projects";
import "./Projects.css";

const Projects = () => {
  const { theme, isDarkMode } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const edgeRaf = useRef<number>(0);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    setHintVisible(false);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    setIsDragging(true);
    setHintVisible(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft =
      drag.current.scrollLeft -
      (e.pageX - el.offsetLeft - drag.current.startX) * 1.2;
  };

  const onMouseUp = () => {
    drag.current.active = false;
    setIsDragging(false);
    cancelAnimationFrame(edgeRaf.current);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ backgroundColor: theme.background }}
      className="relative py-24 px-6 md:px-16 lg:px-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading — matches About & Skills */}
        <motion.div
          className="mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{ color: theme.textMain }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic"
          >
            My <span style={{ color: theme.primary }}>Projects.</span>
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto md:mx-0"
            style={{ backgroundColor: theme.primary }}
          />
        </motion.div>

        {/* Scroll controls */}
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="chevron-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-5"
              style={{
                backgroundColor: theme.surface,
                color: theme.primary,
                border: `1px solid ${theme.border}`,
              }}
              aria-label="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="chevron-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-5"
              style={{
                backgroundColor: theme.surface,
                color: theme.primary,
                border: `1px solid ${theme.border}`,
              }}
              aria-label="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          )}
          <div
            ref={scrollRef}
            className={`projects-scroll-row${isDragging ? " dragging" : ""}`}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
            onTouchStart={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              drag.current = {
                active: true,
                startX: e.touches[0].pageX - el.offsetLeft,
                scrollLeft: el.scrollLeft,
              };
              setHintVisible(false);
            }}
            onTouchMove={(e) => {
              if (!drag.current.active) return;
              const el = scrollRef.current;
              if (!el) return;
              el.scrollLeft =
                drag.current.scrollLeft -
                (e.touches[0].pageX - el.offsetLeft - drag.current.startX) *
                  1.2;
            }}
            onTouchEnd={() => {
              drag.current.active = false;
            }}
          >
            {projectsData.map((project, idx) => (
              <motion.article
                key={project.title}
                className="projects-card rounded-4xl p-5 border"
                style={{
                  background: isDarkMode ? theme.surface : "#ffffff",
                  borderColor: isDarkMode ? theme.border : "#e5e7eb",
                  boxShadow: isDarkMode
                    ? "0 4px 20px rgba(0,0,0,0.4)"
                    : "0 4px 20px rgba(0,0,0,0.07)",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.07 }}
              >
                <div
                  className="aspect-video rounded-xl overflow-hidden mb-4 border"
                  style={{ borderColor: isDarkMode ? theme.border : "#f3f4f6" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-sm font-black uppercase tracking-wide mb-2"
                  style={{ color: theme.textMain }}
                >
                  {project.title}
                </h3>
                <p
                  className="card-desc text-sm mb-4 leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full text-xs border font-medium"
                      style={{
                        background: isDarkMode
                          ? theme.primary + "22"
                          : theme.primary + "15",
                        color: theme.primary,
                        borderColor: isDarkMode
                          ? theme.primary + "44"
                          : theme.primary + "30",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                    style={{ color: theme.textSecondary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = theme.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = theme.textSecondary)
                    }
                  >
                    <FaGithub size={14} /> Code
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                    style={{ color: theme.textSecondary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = theme.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = theme.textSecondary)
                    }
                  >
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Drag hint */}
        {hintVisible && isInView && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ x: [-4, 0, -4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: theme.primary }}
            >
              <FiChevronLeft size={16} />
            </motion.div>
            <motion.span
              style={{ fontSize: 18 }}
              animate={{ x: [0, 14, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              👆
            </motion.span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: theme.primary,
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.18,
                  }}
                />
              ))}
            </div>
            <motion.div
              animate={{ x: [4, 0, 4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: theme.primary }}
            >
              <FiChevronRight size={16} />
            </motion.div>
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: theme.textSecondary }}
            >
              drag to scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
