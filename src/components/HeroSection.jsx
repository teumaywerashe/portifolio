import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaReact, FaNodeJs, FaHtml5, FaJs, FaCss3Alt } from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiPostman,
  SiGit,
  SiGithub,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import profilePic from "../assets/profile.jpeg";
import useTheme from "../context/ThemeContext";

const Snow = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
    {[...Array(50)].map((_, i) => (
      <span
        key={i}
        className="absolute top-[-10px] w-[2px] h-[2px] rounded-full bg-white/30 animate-snow"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 12}s`,
        }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  const { theme, isDarkMode } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const techStack = [
    // Frontend
    { icon: <FaReact />, color: "#61DBFB", distance: 220, delay: 0 },
    { icon: <FaHtml5 />, color: "#E34F26", distance: 220, delay: 0.01 },
    { icon: <FaCss3Alt />, color: "#1572B6", distance: 220, delay: 0.03 },
    { icon: <FaJs />, color: "#F7DF1E", distance: 220, delay: 0.04 },
    { icon: <SiTailwindcss />, color: "#38BDF8", distance: 220, delay: 0.05 },

    // Backend
    { icon: <FaNodeJs />, color: "#68A063", distance: 220, delay: 0.06 },
    {
      icon: <SiExpress />,
      color: isDarkMode ? "#fff" : "#000",
      distance: 220,
      delay: 0.07,
    },

    // Databases
    { icon: <SiMongodb />, color: "#47A248", distance: 220, delay: 0.08 },
    { icon: <SiPostgresql />, color: "#336791", distance: 220, delay: 0.09 },
    { icon: <SiMysql />, color: "#4479A1", distance: 220, delay: 0.1 },

    // Tools & DevOps
    { icon: <SiGit />, color: "#F05032", distance: 220, delay: 0.11 },
    {
      icon: <SiGithub />,
      color: isDarkMode ? "#fff" : "#000",
      distance: 220,
      delay: 0.12,
    },
    { icon: <SiPostman />, color: "#FF6C37", distance: 220, delay: 0.13 },
    { icon: <SiDocker />, color: "#2496ED", distance: 220, delay: 0.14 },
  ];

  return (
    <section
      id="home"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative min-h-[85vh] flex flex-col gap-20 md:flex-row items-center px-6 md:px-16 lg:px-24 pt-12 md:pt-16 overflow-hidden transition-colors duration-500"
    >
      <Snow />

      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-10 md:max-w-xl z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="px-6 py-2 rounded-full font-semibold"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(99,102,241,0.15)"
              : "rgba(99,102,241,0.1)",
            color: theme.primary,
            border: `1px solid ${theme.border}`,
          }}
        >
          Full-Stack Web & Mobile Developer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ color: theme.textMain }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
        >
          Teumay{" "}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
            Werashe
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ color: theme.textSecondary }}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md md:max-w-xl"
        >
          I build <b>modern, scalable MERN applications</b> and robust React
          ecosystems. I also craft{" "}
          <span className="text-green-500 font-bold">React Native</span> mobile
          apps with high-performance UX and interactive interfaces.
        </motion.p>

        <div className="hidden md:flex gap-4 mt-4">
          <a
            href="#projects"
            style={{ backgroundColor: theme.primary }}
            className="px-8 py-3 rounded-full text-white font-bold shadow-xl hover:scale-105 transition"
          >
            Explore Projects
          </a>
          <a
            href="https://drive.google.com/file/d/19FBickcTMCnS_5X_vdVo22mDkVH0KnHD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            style={{
              color: theme.textMain,
              border: `2px solid ${theme.border}`,
            }}
            className="px-8 py-3 rounded-full font-bold hover:bg-gray-500/5 transition flex items-center gap-2"
          >
            <FiDownload /> Resume
          </a>
        </div>
      </div>

      <div className="relative mt-10 md:mt-0 mx-auto w-50 h-50 md:w-[380px] md:h-[380px] z-10">
        {/* <div
          className="absolute inset-0 rounded-full blur-[100px] opacity-25"
          style={{ backgroundColor: theme.primary }}
        /> */}
        <div
          className="relative z-10 w-full h-full rounded-full overflow-hidden border-[3px]"
          style={{ borderColor: theme.primary }}
        >
          <img
            src={profilePic}
            alt="Teumay"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition"
          />
        </div>

    
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="flex md:hidden flex-col sm:flex-row gap-4 mt-8 items-center w-full justify-center"
      >
        <a
          href="#projects"
          style={{ backgroundColor: theme.primary }}
          className="px-10 py-4 rounded-full text-white font-bold shadow-xl hover:scale-105 transition"
        >
          Explore Projects
        </a>
        <a
          href="/Teumay_Werashe_resume.pdf"
          download
          style={{ color: theme.textMain, border: `2px solid ${theme.border}` }}
          className="px-10 py-4 rounded-full font-bold hover:bg-gray-500/5 transition flex items-center gap-2"
        >
          <FiDownload /> Resume
        </a>
      </motion.div>

      <style>
        {`
          @keyframes snow {
            to { transform: translateY(110vh); }
          }
          .animate-snow {
            animation-name: snow;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
