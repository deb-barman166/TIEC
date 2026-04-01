import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Courses from '../components/Courses';
import Skills from '../components/Skills';
import AdmissionSection from '../components/AdmissionSection';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Skills />
        <AdmissionSection />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
