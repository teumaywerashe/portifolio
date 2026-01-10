import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Projects from '../components/Projects';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import About from '../components/About';
import Skills from '../components/Skills';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <About/>
      <Skills/>
      <Projects />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
