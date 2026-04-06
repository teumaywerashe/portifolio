"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useTheme from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const particles = Array.from({ length: 25 });

  return (
    <section
      id="about"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="relative py-24 px-6 md:px-16 lg:px-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
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
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{ color: theme.textMain }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic"
          >
            About <span style={{ color: theme.primary }}>Me.</span>
          </h2>
          <div
            className="h-1.5 w-24 rounded-full mx-auto md:mx-0"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </motion.div>
        <div className="grid grid-cols-1 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1 flex-1"
          >
            <p
              style={{ color: theme.textSecondary }}
              className="text-lg md:text-xl leading-relaxed mb-6 font-medium"
            >
              Hello! I&apos;m{" "}
              <span className="font-bold" style={{ color: theme.textMain }}>
                Teumay Werashe
              </span>
              , a passionate{" "}
              <span className="font-bold" style={{ color: theme.primary }}>
                Full Stack Developer
              </span>{" "}
              and Software Engineering student. I specialize in building robust,
              scalable, and user-centric web and mobile applications using
              modern technologies.
            </p>
            <p
              style={{ color: theme.textSecondary }}
              className="text-lg md:text-xl leading-relaxed mb-8 opacity-90"
            >
              My journey began with a curiosity for how digital products are
              crafted. Over the years, I&apos;ve developed expertise in{" "}
              <span className="font-bold" style={{ color: theme.textMain }}>
                JavaScript, React, Next.js, Node.js, Express, MongoDB, PostgreSQL
              </span>
              , and more. I thrive on solving complex problems and delivering
              impactful solutions.
            </p>
            <p
              style={{
                color: theme.textSecondary,
                borderColor: theme.primary + "40",
              }}
              className="text-lg md:text-xl leading-relaxed mb-8 opacity-90 border-l-4 pl-4"
            >
              I am committed to writing clean, maintainable code and
              collaborating in dynamic teams. My toolkit includes{" "}
              <span className="font-bold" style={{ color: theme.textMain }}>
                Git, Docker, Prisma,
              </span>{" "}
              and cloud platforms. I value continuous learning and always seek
              to stay ahead with the latest industry trends.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-2">
              {[
                "Web Development",
                "Mobile Apps",
                "API Design",
                "Cloud",
                "Teamwork",
                "Problem Solving",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: theme.primary + "15",
                    color: theme.primary,
                    border: `1px solid ${theme.primary}30`,
                  }}
                  className="px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-opacity-20 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
