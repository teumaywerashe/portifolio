import React, { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from "react-icons/fi";
import useTheme from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isDarkMode, toggleTheme } = useTheme();
const navigate=useNavigate()
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      style={{
        backgroundColor: `${theme.background}E6`,
        borderBottom: `1px solid ${theme.border}`,
      }}
      className="sticky top-0 z-50 w-full backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleScroll("home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div
              style={{ backgroundColor: theme.primary }}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-bold font-extrabold shadow-md group-hover:rotate-12 transition"
            >
              T
            </div>
            <span
              style={{ color: theme.textMain }}
              className="hidden sm:block text-xl font-bold"
            >
              Teumay <span style={{ color: theme.primary }}>Werashe</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(`/${link.id}`)}
                style={{ color: theme.textSecondary }}
                className="text-sm cursor-pointer font-semibold transition hover:text-orange-500"
              >
                {link.label}
              </button>
            ))}

            <div
              className="flex items-center gap-4 border-l pl-6"
              style={{ borderColor: theme.border }}
            >
              <button
                onClick={toggleTheme}
                style={{ color: theme.textSecondary }}
                className="rounded-full cursor-pointer p-2 hover:bg-gray-500/10 transition"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <a
                href="https://drive.google.com/file/d/19FBickcTMCnS_5X_vdVo22mDkVH0KnHD/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                // download="Teumay_Werashe_resume.pdf"
                className="flex items-center justify-center gap-3 font-bold rounded-full px-5 py-2 text-sm transition hover:bg-gray-500/5"
                style={{
                  border: `2px solid ${theme.border}`,
                  backgroundColor: theme.primary,
                  color: "white",
                }}
              >
                <FiDownload /> Get Resume
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button className="cursor-pointer"
              onClick={toggleTheme}
              style={{ color: theme.textSecondary }}
            >
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>
            <button className="cursor-pointer" onClick={toggleMenu} style={{ color: theme.textMain }}>
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: theme.background,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div className="flex flex-col space-y-2 px-4 pb-8 pt-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="text-left py-3 text-lg font-medium"
              style={{
                color: theme.textMain,
                borderBottom: `1px solid ${theme.border}33`,
              }}
            >
              {link.label}
            </button>
          ))}

          <a
            href="./Teumay_Werashe_resume.pdf"
            
            download="Teumay_Werashe_resume.pdf"
            className="flex items-center justify-center gap-3 mt-4 w-full rounded-full py-4 text-center text-lg font-bold transition hover:bg-gray-500/5"
            style={{
              border: `2px solid ${theme.border}`,
              backgroundColor: theme.primary,
              color: "white",
            }}
          >
            <FiDownload /> Get Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
