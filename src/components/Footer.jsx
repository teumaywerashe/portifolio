import React from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMessageCircle, FiMail } from "react-icons/fi";
import useTheme from "../context/ThemeContext";

const IconLink = ({ href, label, icon, theme }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      backgroundColor: theme.surface,
      border: `1px solid ${theme.border}`,
      color: theme.textMain,
    }}
    className="p-3 rounded-2xl hover:scale-110 transition-all duration-300 hover:text-white hover:bg-orange-500 shadow-sm"
  >
    <span className="text-xl">{icon}</span>
  </a>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        backgroundColor: theme.background,
        borderTop: `1px solid ${theme.border}`,
      }}
      className="relative z-10 py-12 px-6 md:px-16 lg:px-24 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left order-2 md:order-1">
          <h1
            style={{ color: theme.textMain }}
            className="text-2xl font-black tracking-tighter italic uppercase"
          >
            Teumay <span style={{ color: theme.primary }}>Werashe.</span>
          </h1>
          <p
            style={{ color: theme.textSecondary }}
            className="mt-2 text-sm max-w-xs font-medium opacity-80"
          >
            Digital Engineer specializing in high-performance MERN & Mobile
            experiences.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["Home", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{ color: theme.textSecondary }}
                  className="text-xs font-bold uppercase tracking-[0.2em] hover:text-orange-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 order-3">
          <IconLink
            href="https://linkedin.com/in/teu-18141a308"
            label="LinkedIn"
            icon={<FiLinkedin />}
            theme={theme}
          />
          <IconLink
            href="https://github.com/teumaywerashe"
            label="GitHub"
            icon={<FiGithub />}
            theme={theme}
          />
          <IconLink
            href="teumay21@gmail.com"
            label="Email"
            icon={<FiMail />}
            theme={theme}
          />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto mt-12 pt-8 border-t border-dashed"
        style={{ borderColor: theme.border }}
      >
        <div
          style={{ color: theme.textSecondary }}
          className="text-center text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-50"
        >
          © {new Date().getFullYear()} Teumay Werashe • All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
