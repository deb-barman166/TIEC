import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, IndianRupee } from 'lucide-react';

const coursesData = [
  {
    category: 'Certificate',
    duration: '6 Months',
    items: [
      { id: 'CITA', name: 'Certificate in Information Technology Application', price: '2000' },
      { id: 'CDTA', name: 'Certificate in Desktop Publishing Application', price: '3000' },
      { id: 'CFAS', name: 'Certificate in Financial Accounting System', price: '2000' },
      { id: 'CDTP', name: 'Certificate in Desktop Publishing', price: '2000' },
      { id: 'CCHM', name: 'Certificate in Computer Hardware Maintenance', price: '2800' },
    ],
  },
  {
    category: 'Diploma',
    duration: '1 Year',
    items: [
      { id: 'DITA', name: 'Diploma in Information Technology Application', price: '5000' },
      { id: 'DDTA', name: 'Diploma in Desktop Publishing Application', price: '8000' },
      { id: 'DFAS', name: 'Diploma in Financial Accounting System', price: '5000' },
      { id: 'DDTP', name: 'Diploma in Desktop Publishing', price: '5000' },
      { id: 'DCHM', name: 'Diploma in Computer Hardware Maintenance', price: '6000' },
    ],
  },
  {
    category: 'Advanced',
    duration: '1.5 Years',
    items: [
      { id: 'ADITA', name: 'Advanced Diploma in Information Technology Application', price: '8000' },
    ],
  },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...coursesData.map(c => c.category)];

  const filteredCourses = activeCategory === 'All' 
    ? coursesData.flatMap(c => c.items.map(item => ({ ...item, category: c.category, duration: c.duration })))
    : coursesData.find(c => c.category === activeCategory)?.items.map(item => ({ ...item, category: activeCategory, duration: coursesData.find(c => c.category === activeCategory)?.duration })) || [];

  return (
    <section id="courses" className="py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-cyan/30 mb-6">
            <span className="text-xs font-medium tracking-widest uppercase text-accent-cyan">
              Our Programs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            Explore Our <span className="gradient-text neon-text-purple">Courses</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
            Comprehensive training programs designed to build your future. 
            Choose from certificate, diploma, and advanced courses.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent-purple text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-accent-purple'
                  : 'glass-panel text-text-secondary hover:text-white border border-white/10 hover:border-accent-purple/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-accent-cyan/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 rounded-xl bg-bg-surface border border-white/10 group-hover:border-accent-cyan/30 transition-colors">
                    <BookOpen className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-2xl font-heading font-bold mb-2 text-white group-hover:text-accent-cyan transition-colors relative z-10">
                  {course.id}
                </h3>
                
                <p className="text-text-secondary text-sm mb-8 flex-grow relative z-10 line-clamp-2">
                  {course.name}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Clock className="w-4 h-4 text-accent-purple" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white font-bold text-lg">
                    <IndianRupee className="w-4 h-4 text-accent-cyan" />
                    <span>{course.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
