import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import About from "../components/About";
import Skills from "../components/Skills";
import { Route, Router, Routes } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="*" element={<HeroSection />} />
        <Route path="/home" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      {/* <HeroSection/>
      <About/>
      <Skills/>
      <Projects />
      <ContactForm /> */}

      <Footer />
    </div>
  );
};

export default LandingPage;
