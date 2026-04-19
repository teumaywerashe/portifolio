"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiDownload } from "react-icons/fi";
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
  const { theme } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="home"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-48 px-6 md:px-16 lg:px-24 py-20 overflow-hidden transition-colors duration-500"
    >
      <Snow />

      {/* Profile image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 w-52 h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0"
      >
        <div
          className="w-full h-full rounded-full overflow-hidden border-4 border-gray-600"
          // style={{ borderColor: theme.primary }}
        >
          <Image
            src={profilePic}
            alt="Teumay Werashe"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ color: theme.textMain }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter"
        >
          Hi, I&apos;m{" "}
          <span style={{ color: theme.primary }}>Teumay Werashe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          style={{ color: theme.textSecondary }}
          className="text-lg md:text-xl leading-relaxed"
        >
          A <span className="font-bold" style={{ color: theme.textMain }}>Fullstack</span> and{" "}
          <span className="font-bold" style={{ color: theme.textMain }}>Mobile App</span> Developer
          crafting scalable, user-centric web experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center md:justify-start"
        >
          <button
            onClick={() => router.push("/projects")}
            style={{ backgroundColor: theme.primary }}
            className="px-8 py-3 rounded-full text-white font-bold shadow-lg hover:scale-105 transition"
          >
            Explore Projects
          </button>
          <a
            href="https://drive.google.com/file/d/19FBickcTMCnS_5X_vdVo22mDkVH0KnHD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            style={{ color: theme.textMain, border: `2px solid ${theme.border}` }}
            className="px-8 py-3 rounded-full font-bold hover:bg-gray-500/10 transition flex items-center gap-2"
          >
            <FiDownload /> Resume
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes snow { to { transform: translateY(110vh); } }
        .animate-snow { animation-name: snow; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;
