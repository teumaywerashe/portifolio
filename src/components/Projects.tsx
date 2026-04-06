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

  const syncState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(syncState, 100);
    el.addEventListener("scroll", syncState);
    window.addEventListener("resize", syncState);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hide = () => setHintVisible(false);
    el.addEventListener("scroll", hide, { once: true });
    return () => el.removeEventListener("scroll", hide);
  }, []);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    setIsDragging(true);
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft = drag.current.scrollLeft - (e.pageX - el.offsetLeft - drag.current.startX) * 1.2;
  }, []);

  const onMouseUp = useCallback(() => {
    drag.current.active = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const onTouchStart = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.touches[0].pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.scrollLeft - (e.touches[0].pageX - el.offsetLeft - drag.current.startX) * 1.2;
  }, []);

  const onTouchEnd = useCallback(() => { drag.current.active = false; }, []);

  const onRowMouseMove = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || drag.current.active) return;
    const { left, width } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const zone = 80, speed = 12;
    cancelAnimationFrame(edgeRaf.current);
    let v = 0;
    if (x < zone) v = -speed * (1 - x / zone);
    else if (x > width - zone) v = speed * (1 - (width - x) / zone);
    if (!v) return;
    const tick = () => { el.scrollLeft += v; edgeRaf.current = requestAnimationFrame(tick); };
    edgeRaf.current = requestAnimationFrame(tick);
  }, []);

  const onRowMouseLeave = useCallback(() => cancelAnimationFrame(edgeRaf.current), []);

  const particles = Array.from({ length: 35 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ backgroundColor: theme.background }}
      className="relative px-6 md:px-12 py-12 transition-colors duration-500 overflow-hidden"
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
              animate={{ y: [0, 1200], opacity: [0, 0.7, 0.7, 0], x: [0, Math.random() * 60 - 30, 0] }}
              transition={{ duration, repeat: Infinity, delay: -delay, ease: "linear" }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2
              style={{ color: theme.textMain }}
              className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase mb-3"
            >
              Featured <span style={{ color: theme.primary }}>Work.</span>
            </h2>
            <div className="h-1.5 w-24 rounded-full" style={{ backgroundColor: theme.primary }} />
          </motion.div>
        </div>

        <div
          ref={scrollRef}
          className={`projects-scroll-row${isDragging ? " dragging" : ""}`}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onRowMouseMove}
          onMouseLeave={onRowMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={(e) => {
            if (!drag.current.active) return;
            const el = scrollRef.current;
            if (!el) return;
            el.scrollLeft = drag.current.scrollLeft - (e.touches[0].pageX - el.offsetLeft - drag.current.startX) * 1.2;
          }}
          onTouchEnd={() => { drag.current.active = false; }}
        >
          {projectsData.map((project, idx) => (
            <motion.article
              key={project.title}
              className="projects-card rounded-2xl p-5 border"
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
    </section>
  );
};

export default Projects;
