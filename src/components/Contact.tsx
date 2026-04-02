import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import AnimatedDropdown from './AnimatedDropdown';
import { coursesData } from './Courses';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    message: ''
  });

  const availableCourses = useMemo(() => {
    const allCourses = coursesData.flatMap(c => c.items);
    return allCourses.map(course => ({ value: course.name, label: course.name }));
  }, []);
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-bg-surface/50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-purple/30 mb-6">
            <span className="text-xs font-medium tracking-widest uppercase text-accent-purple">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            Ready to <span className="gradient-text neon-text-cyan">Start?</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
            Contact us today to enroll in our courses or ask any questions. 
            We're here to help you build your future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-all duration-300">
              <h3 className="text-2xl font-heading font-bold mb-6 text-white">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                    <MapPin className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Location</h4>
                    <p className="text-text-secondary leading-relaxed">
                      Madan Mohan, Ward No. 8<br />
                      Tufanganj, Coochbehar
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
                    <Phone className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-text-secondary leading-relaxed">
                      +91 (Contact Number)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                    <Mail className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-text-secondary leading-relaxed">
                      info@tiec.edu.in
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden h-64 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 mix-blend-overlay z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14331.642953284032!2d89.6583!3d26.315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2e5!2sTufanganj%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-all duration-300 flex flex-col gap-6">
              <h3 className="text-2xl font-heading font-bold mb-2 text-white">Send us a Message</h3>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-text-secondary uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-bg-base border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300 placeholder:text-white/20"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-bg-base border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300 placeholder:text-white/20"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Interested Course</label>
                <AnimatedDropdown
                  options={availableCourses}
                  value={formData.course}
                  onChange={(val) => setFormData({...formData, course: val})}
                  placeholder="Select a course"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-bg-base border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300 placeholder:text-white/20 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="button"
                className="mt-4 group relative px-8 py-4 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
