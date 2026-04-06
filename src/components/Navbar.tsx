"use client";
import React, { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../context/ThemeContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (id: string) => {
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
            onClick={() => {
              router.push("/");
              handleScroll("home");
            }}
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
                onClick={() => router.push(`/${link.id === "home" ? "" : link.id}`)}
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
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              className="cursor-pointer"
              onClick={toggleTheme}
              style={{ color: theme.textSecondary }}
            >
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>
            <button
              className="cursor-pointer"
              onClick={toggleMenu}
              style={{ color: theme.textMain }}
            >
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
