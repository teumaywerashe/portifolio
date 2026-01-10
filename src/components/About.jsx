import React, { useRef } from 'react';
import { motion } from "framer-motion";
import {  useInView } from 'framer-motion';
import { FiUser, FiCode, FiSmartphone, FiDatabase } from 'react-icons/fi';
import useTheme from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // const stats = [
  //   { label: 'Experience', value: '1+', icon: <FiCode /> },
  //   { label: 'Apps Built', value: '12+', icon: <FiSmartphone /> },
  //   { label: 'Clients', value: '10+', icon: <FiUser /> },
  //   { label: 'Stack', value: 'MERN', icon: <FiDatabase /> },
  // ];

  return (
    <section 
      id="about"
      ref={ref}
      style={{ backgroundColor: theme.background }}
      className="py-20 px-4 md:py-24 md:px-16 lg:px-24 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        

        

        <div className="grid grid-cols-1 gap-12 lg:gap-20 items-center">
          
        


  {/* --- HEADER SECTION --- */}
  <motion.div 
    className="mb-12 md:mb-16 text-center lg:text-left"
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
  >
    <h2 
      style={{ color: theme.textMain }}
      className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase italic"
    >
      About <span style={{ color: theme.primary }}>Me.</span>
    </h2>
    {/* Styled underline with a slight glow */}
    <div 
      className="h-1.5 w-20 rounded-full mx-auto lg:mx-0" 
      style={{ 
        backgroundColor: theme.primary,
        boxShadow: `0 0 15px ${theme.primary}60` 
      }}
    ></div>
  </motion.div>

  {/* --- CONTENT SECTION --- */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-center lg:text-left order-2 lg:order-1 flex-1"
  >
    {/* Main Intro */}
    <p style={{ color: theme.textSecondary }} className="text-lg md:text-xl leading-relaxed mb-6 font-medium">
      Hello! I'm <span className="font-bold" style={{ color: theme.textMain }}>Teumay Werashe</span>, 
      a Software Engineering student and <span className="font-bold" style={{ color: theme.primary }}>Full Stack Developer</span> specialized 
      in the MERN ecosystem and cross-platform mobile development. I enjoy coding and am always eager to explore new technologies, 
      improve my skills, and tackle challenging projects.
    </p>

    {/* Tech Journey */}
    <p style={{ color: theme.textSecondary }} className="text-lg md:text-xl leading-relaxed mb-8 opacity-90">
      My journey in web development started with a fascination for how websites work. Since then, I've been honing my skills in 
      front-end technologies like <span className="font-bold" style={{ color: theme.textMain }}>HTML, CSS, JavaScript,</span> and 
      <span className="font-bold" style={{ color: theme.textMain }}> React</span>, as well as backend development with 
      <span className="font-bold" style={{ color: theme.textMain }}> Node.js, Express,</span> and <span className="font-bold" style={{ color: theme.textMain }}>MongoDB</span>.
    </p>

    {/* Tools & Specialties */}
    <p style={{ color: theme.textSecondary ,borderColor: theme.primary + '40' }} className="text-lg md:text-xl leading-relaxed mb-8 opacity-90 border-l-4 pl-4">
      Whether it’s architecting a complex backend with <span className="font-bold" style={{ color: theme.textMain }}>Node.js </span> 
      or crafting smooth mobile interfaces using <span className="font-bold" style={{ color: theme.primary }}>React Native</span>, 
      I strive for clean code and performance. I also work with tools like Git, Docker, and Prisma to build scalable applications.
    </p>

    {/* Tags */}
    <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
      {['Architecture', 'Backend', 'API', 'Mobile UX'].map((tag) => (
        <span 
          key={tag}
          style={{ 
            backgroundColor: theme.primary + '15', 
            color: theme.primary,
            border: `1px solid ${theme.primary}30`
          }}
          className="px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-opacity-20 transition-all cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>


          

{/* 
          <motion.div 
            className="grid grid-cols-2 gap-4 md:gap-6 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  backgroundColor: theme.surface, 
                  border: `1px solid ${theme.border}` 
                }}
                className="p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-sm group transition-all"
              >
                <div 
                  style={{ backgroundColor: theme.primary + '15', color: theme.primary }}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  {stat.icon}
                </div>
                <h3 style={{ color: theme.textMain }} className="text-2xl md:text-3xl font-black mb-1">
                  {stat.value}
                </h3>
                <p style={{ color: theme.textSecondary }} className="text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-widest opacity-70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div> */}

        </div>
      </div>
    </section>
  );
};

export default About;