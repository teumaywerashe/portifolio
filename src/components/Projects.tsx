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
    drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    setIsDragging(true);
    setHintVisible(false);
  };

  const onRowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.2;
  };

  const onRowMouseLeave = () => {
    drag.current.active = false;
    setIsDragging(false);
    cancelAnimationFrame(edgeRaf.current);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.touches[0].pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    setHintVisible(false);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4"
      style={{ background: isDarkMode ? theme.background : "#f9fafb" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-3" style={{ color: theme.textMain }}>
            Projects
          </h2>
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            A selection of things I&apos;ve built
          </p>
        </motion.div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 rounded-full p-2 shadow-lg"
              style={{ background: theme.surface, color: theme.primary }}
              aria-label="Scroll left"
            >
              <FiChevronLeft size={20} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 rounded-full p-2 shadow-lg"
              style={{ background: theme.surface, color: theme.primary }}
              aria-label="Scroll right"
            >
              <FiChevronRight size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="projects-scroll flex gap-5 overflow-x-auto pb-4 select-none"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseMove={onRowMouseMove}
            onMouseLeave={onRowMouseLeave}
            onMouseUp={() => { drag.current.active = false; setIsDragging(false); }}
            onTouchStart={onTouchStart}
            onTouchMove={(e) => {
              if (!drag.current.active) return;
              const el = scrollRef.current;
              if (!el) return;
              el.scrollLeft =
                drag.current.scrollLeft -
                (e.touches[0].pageX - el.offsetLeft - drag.current.startX) * 1.2;
            }}
            onTouchEnd={() => { drag.current.active = false; }}
          >
            {projectsData.map((project, idx) => (
              <motion.article
                key={project.title}
                className="projects-card rounded-2xl p-5 border flex-shrink-0"
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
                <motion.h3
                  className="text-base font-bold mb-2 capitalize"
                  style={{ color: theme.textMain }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.title}
                </motion.h3>
                <p
                  className="card-desc text-sm mb-4 line-clamp-3"
                  style={{ color: theme.textSecondary }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full text-xs border"
                      style={{
                        background: isDarkMode ? theme.primary + "22" : "#eef2ff",
                        color: theme.primary,
                        borderColor: isDarkMode ? theme.primary + "44" : "#c7d2fe",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: theme.textSecondary }}
                    whileHover={{ x: 3, color: theme.primary }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={15} />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: theme.textSecondary }}
                    whileHover={{ x: 3, color: theme.primary }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt size={13} />
                    Live Demo
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {hintVisible && isInView && (
          <motion.div
            className="relative z-10 flex items-center justify-center gap-2 mt-5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ x: [-4, 0, -4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: theme.primary }}
            >
              <FiChevronLeft size={16} />
            </motion.div>
            <motion.span
              style={{ fontSize: 18 }}
              animate={{ x: [0, 14, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              👆
            </motion.span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ width: 5, height: 5, backgroundColor: theme.primary }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
            <motion.div
              animate={{ x: [4, 0, 4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: theme.primary }}
            >
              <FiChevronRight size={16} />
            </motion.div>
            <span
              className="text-xs font-medium tracking-widest uppercase"
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
