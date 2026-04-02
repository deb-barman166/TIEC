import { motion } from 'motion/react';
import { Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-bg-base pt-20 pb-10 overflow-hidden border-t border-white/10">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#home" className="inline-block">
              <Logo />
            </a>
            <p className="text-text-secondary text-sm leading-relaxed mt-4">
              Upgrade Your Skills. Build Your Future. Premium computer training institute in Tufanganj, Coochbehar.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ y: -8, scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.facebook.com/TIEC2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.6)]"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -8, scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://youtube.com/@tufanganji.teducationcentr1031"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-text-secondary hover:text-accent-purple hover:border-accent-purple/50 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Courses', 'Admission', 'Skills', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-text-secondary hover:text-accent-cyan transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/50 group-hover:bg-accent-cyan group-hover:scale-150 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Top Courses</h4>
            <ul className="space-y-3">
              {['ADITA', 'DITA', 'Web Development', 'Tally GST', 'Photoshop'].map((course) => (
                <li key={course}>
                  <a
                    href="#courses"
                    className="text-text-secondary hover:text-accent-purple transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/50 group-hover:bg-accent-purple group-hover:scale-150 transition-all duration-300" />
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="w-5 h-5 text-accent-cyan shrink-0" />
                <span>Madan Mohan, Ward No. 8<br />Tufanganj, Coochbehar</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="w-5 h-5 text-accent-purple shrink-0" />
                <span>+91 (Contact Number)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                <span>info@tiec.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Tufanganj IT Education Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
