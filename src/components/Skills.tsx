import { motion } from 'motion/react';
import { Code2, Monitor, PenTool, MessageSquare, Database } from 'lucide-react';

const skills = [
  { name: 'Web Designing & Development', icon: Code2, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  { name: 'Photoshop', icon: PenTool, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  { name: 'Tally GST', icon: Database, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  { name: 'Basic Computer Training', icon: Monitor, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
  { name: 'Spoken English', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-bg-surface/50">
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
              Other Skills
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            Master <span className="gradient-text neon-text-cyan">Essential Skills</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
            Beyond our core programs, we offer specialized training to enhance your 
            professional toolkit and boost your career prospects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`glass-panel p-8 rounded-2xl border ${skill.border} hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300 group flex flex-col items-center text-center`}
            >
              <div className={`w-16 h-16 rounded-2xl ${skill.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-white group-hover:text-accent-cyan transition-colors">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
