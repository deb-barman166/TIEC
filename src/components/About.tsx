import { motion } from 'motion/react';
import { Award, BookOpen, Users, Zap } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Rating', value: '4.9', icon: Award, suffix: '/5' },
    { label: 'Reviews', value: '39+', icon: Users, suffix: '' },
    { label: 'Courses', value: '15+', icon: BookOpen, suffix: '' },
    { label: 'Success Rate', value: '98', icon: Zap, suffix: '%' },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-bg-surface/50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-purple/30">
              <span className="text-xs font-medium tracking-widest uppercase text-accent-purple">
                About TIEC
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              Empowering the Next Generation of <span className="gradient-text neon-text-cyan">Tech Leaders</span>
            </h2>
            
            <p className="text-lg text-text-secondary leading-relaxed font-light">
              Tufanganj IT Education Centre (TIEC) is a premier computer training institute powered by E-Max. 
              We are dedicated to providing high-quality, industry-relevant education that equips our students 
              with the skills needed to thrive in the digital age.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed font-light">
              Located in the heart of Tufanganj, Coochbehar, we offer a wide range of certificate, diploma, 
              and advanced courses designed to meet the evolving demands of the tech industry.
            </p>

            <div className="pt-4">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 text-accent-cyan font-medium hover:text-white transition-colors group"
              >
                Discover Our Programs
                <span className="w-8 h-px bg-accent-cyan group-hover:w-12 group-hover:bg-white transition-all duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <stat.icon className="w-8 h-8 text-accent-cyan mb-6 group-hover:scale-110 transition-transform duration-300" />
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-heading font-bold text-white">{stat.value}</span>
                  <span className="text-xl text-accent-purple font-medium">{stat.suffix}</span>
                </div>
                
                <p className="text-sm text-text-secondary uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
