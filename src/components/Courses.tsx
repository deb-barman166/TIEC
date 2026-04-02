import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, IndianRupee, X, Calendar, CheckCircle2 } from 'lucide-react';

export const coursesData = [
  {
    category: 'Certificate',
    duration: '6 Months',
    items: [
      { 
        id: 'CITA', 
        name: 'Certificate in Information Technology Application', 
        price: '2000',
        admissionFee: '500',
        syllabus: [
          { month: 'Month 1', topic: 'Computer Fundamentals & OS' },
          { month: 'Month 2', topic: 'MS Word & Data Entry' },
          { month: 'Month 3', topic: 'MS Excel & Data Analysis' },
          { month: 'Month 4', topic: 'MS PowerPoint & Presentations' },
          { month: 'Month 5', topic: 'Internet & Emailing' },
          { month: 'Month 6', topic: 'Project Work & Revision' }
        ]
      },
      { 
        id: 'CDTA', 
        name: 'Certificate in Desktop Publishing Application', 
        price: '3000',
        admissionFee: '800',
        syllabus: [
          { month: 'Month 1', topic: 'Design Fundamentals' },
          { month: 'Month 2', topic: 'Adobe Photoshop Basics' },
          { month: 'Month 3', topic: 'Advanced Photo Editing' },
          { month: 'Month 4', topic: 'CorelDRAW Basics' },
          { month: 'Month 5', topic: 'Vector Graphics & Layouts' },
          { month: 'Month 6', topic: 'Printing Techniques & Portfolio' }
        ]
      },
      { 
        id: 'CFAS', 
        name: 'Certificate in Financial Accounting System', 
        price: '2000',
        admissionFee: '500',
        syllabus: [
          { month: 'Month 1', topic: 'Basic Accounting Concepts' },
          { month: 'Month 2', topic: 'Tally Prime Introduction' },
          { month: 'Month 3', topic: 'Voucher Entry & Inventory' },
          { month: 'Month 4', topic: 'Taxation (GST Basics)' },
          { month: 'Month 5', topic: 'Payroll Management' },
          { month: 'Month 6', topic: 'Final Accounts & Reports' }
        ]
      },
      { 
        id: 'CDTP', 
        name: 'Certificate in Desktop Publishing', 
        price: '2000',
        admissionFee: '500',
        syllabus: [
          { month: 'Month 1', topic: 'Typography & Layout' },
          { month: 'Month 2', topic: 'Adobe PageMaker' },
          { month: 'Month 3', topic: 'Photoshop Essentials' },
          { month: 'Month 4', topic: 'CorelDRAW Essentials' },
          { month: 'Month 5', topic: 'Regional Language Typing' },
          { month: 'Month 6', topic: 'Project & Print Media' }
        ]
      },
      { 
        id: 'CCHM', 
        name: 'Certificate in Computer Hardware Maintenance', 
        price: '2800',
        admissionFee: '700',
        syllabus: [
          { month: 'Month 1', topic: 'Basic Electronics & Components' },
          { month: 'Month 2', topic: 'PC Assembling & Disassembling' },
          { month: 'Month 3', topic: 'OS Installation & Formatting' },
          { month: 'Month 4', topic: 'Software Installation & Drivers' },
          { month: 'Month 5', topic: 'Troubleshooting & Diagnostics' },
          { month: 'Month 6', topic: 'Basic Networking & Security' }
        ]
      },
    ],
  },
  {
    category: 'Diploma',
    duration: '1 Year',
    items: [
      { 
        id: 'DITA', 
        name: 'Diploma in Information Technology Application', 
        price: '5000',
        admissionFee: '1000',
        syllabus: [
          { month: 'Months 1-3', topic: 'Computer Fundamentals, OS, MS Office Suite' },
          { month: 'Months 4-6', topic: 'Advanced Excel, Access Database, Internet' },
          { month: 'Months 7-9', topic: 'HTML, CSS, Web Design Basics' },
          { month: 'Months 10-12', topic: 'Programming Logic (C/C++), Project Work' }
        ]
      },
      { 
        id: 'DDTA', 
        name: 'Diploma in Desktop Publishing Application', 
        price: '8000',
        admissionFee: '1500',
        syllabus: [
          { month: 'Months 1-3', topic: 'Design Principles, Typography, PageMaker' },
          { month: 'Months 4-6', topic: 'Adobe Photoshop (Basic to Advanced)' },
          { month: 'Months 7-9', topic: 'CorelDRAW, Illustrator Basics' },
          { month: 'Months 10-12', topic: 'Adobe InDesign, Print Production, Portfolio' }
        ]
      },
      { 
        id: 'DFAS', 
        name: 'Diploma in Financial Accounting System', 
        price: '5000',
        admissionFee: '1000',
        syllabus: [
          { month: 'Months 1-3', topic: 'Manual Accounting, Tally Prime Basics' },
          { month: 'Months 4-6', topic: 'Inventory, Advanced Voucher Entries' },
          { month: 'Months 7-9', topic: 'GST, TDS, TCS Implementation' },
          { month: 'Months 10-12', topic: 'Payroll, Banking, Finalization of Accounts' }
        ]
      },
      { 
        id: 'DDTP', 
        name: 'Diploma in Desktop Publishing', 
        price: '5000',
        admissionFee: '1000',
        syllabus: [
          { month: 'Months 1-3', topic: 'Layout Design, Regional Typing' },
          { month: 'Months 4-6', topic: 'Adobe Photoshop & Photo Editing' },
          { month: 'Months 7-9', topic: 'CorelDRAW & Vector Graphics' },
          { month: 'Months 10-12', topic: 'Project Work, Pre-press & Post-press' }
        ]
      },
      { 
        id: 'DCHM', 
        name: 'Diploma in Computer Hardware Maintenance', 
        price: '6000',
        admissionFee: '1200',
        syllabus: [
          { month: 'Months 1-3', topic: 'Electronics, PC Architecture, Assembling' },
          { month: 'Months 4-6', topic: 'OS Installation, BIOS, Registry Tweaks' },
          { month: 'Months 7-9', topic: 'Hardware Troubleshooting, Data Recovery' },
          { month: 'Months 10-12', topic: 'Networking (LAN/WAN), Server Basics, Security' }
        ]
      },
    ],
  },
  {
    category: 'Advanced',
    duration: '1.5 Years',
    items: [
      { 
        id: 'ADITA', 
        name: 'Advanced Diploma in Information Technology Application', 
        price: '8000',
        admissionFee: '1500',
        syllabus: [
          { month: 'Months 1-6', topic: 'DITA Module (Office, Web Basics, C/C++)' },
          { month: 'Months 7-12', topic: 'Java Programming, Python Basics, DBMS' },
          { month: 'Months 13-18', topic: 'Advanced Web Dev (React/Node), Live Project' }
        ]
      },
    ],
  },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

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
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-accent-cyan/50 hover:neon-border-cyan transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
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

                <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10 mb-6">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Clock className="w-4 h-4 text-accent-purple" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white font-bold text-lg">
                    <IndianRupee className="w-4 h-4 text-accent-cyan" />
                    <span>{course.price}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-accent-cyan/20 text-white hover:text-accent-cyan font-medium transition-colors border border-white/10 hover:border-accent-cyan/30 relative z-10"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-accent-cyan/30 shadow-[0_0_50px_rgba(0,245,255,0.15)] z-10"
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                    {selectedCourse.category}
                  </span>
                  <span className="flex items-center gap-1 text-text-secondary text-sm">
                    <Clock className="w-4 h-4" /> {selectedCourse.duration}
                  </span>
                </div>
                
                <h2 className="text-3xl font-heading font-bold text-white mb-2">
                  {selectedCourse.id} - {selectedCourse.name}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-text-secondary text-sm mb-1">Total Course Fee</p>
                    <p className="text-2xl font-bold text-accent-cyan flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" /> {selectedCourse.price}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-text-secondary text-sm mb-1">Admission Fee</p>
                    <p className="text-2xl font-bold text-accent-purple flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" /> {selectedCourse.admissionFee}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-cyan" /> Course Syllabus
                  </h3>
                  <div className="space-y-3">
                    {selectedCourse.syllabus?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-bg-surface/50 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                        </div>
                        <div>
                          <p className="text-accent-purple font-medium text-sm mb-1">{item.month}</p>
                          <p className="text-white">{item.topic}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                  <a 
                    href="#admission"
                    onClick={() => setSelectedCourse(null)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold hover:scale-[1.02] transition-transform"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
