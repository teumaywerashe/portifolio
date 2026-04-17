"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { Contact } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <About/>
      <Projects/>
      <Skills/>
      <ContactForm/>
      <Footer />
    </div>
  );
}
