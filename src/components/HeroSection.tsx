"use client";
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
import Image from "next/image";
import profilePic from "../assets/profile.jpeg";
import useTheme from "../context/ThemeContext";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="home"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative mx-auto min-h-[65vh] flex flex-col gap-20 md:flex-row items-center justify-center px-4 md:px-16 lg:px-24 pt-12 md:pt-16 overflow-hidden transition-colors duration-500"
    >
      <Snow />


      <div className="">
        <div className="relative mt-10 md:mt-0 mx-auto w-50 h-50 md:w-[380px] md:h-[380px] z-10">
        <div
          className="relative z-10 w-full h-full rounded-full overflow-hidden border-[3px]"
          style={{ borderColor: theme.primary }}
        >
          <Image
            src={profilePic}
            alt="Teumay"
            className="w-full h-full object-cover scale-105 hover:scale-110 transition"
          />
        </div>
      </div>
       <div className="flex mx-50 flex-col items-center md:items-start text-center md:text-left gap-10 md:max-w-xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ color: theme.textMain }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
        >
          <span className="font-serif"> Hi, I&apos;m </span>
          <span className="text-blue-500 mr-40">Teumay Werashe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ color: theme.textSecondary }}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md md:max-w-xl"
        >
          A <b>Fullstack</b> and <b>Mobile App</b> Developer
        </motion.p>

        <div className="hidden md:flex gap-4 mt-4">
          <button
            onClick={() => router.push("/projects")}
            style={{ backgroundColor: theme.primary }}
            className="px-8 py-3 rounded-full text-white font-bold shadow-xl hover:scale-105 transition"
          >
            Explore Projects
          </button>
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

      <style>{`
        @keyframes snow {
          to { transform: translateY(110vh); }
        }
        .animate-snow {
          animation-name: snow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
