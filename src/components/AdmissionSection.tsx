import { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarX, CheckCircle2, User, Phone, MapPin, Users, BookOpen, X, ArrowRight, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import AnimatedDropdown from './AnimatedDropdown';
import { coursesData } from './Courses';
import ConfirmModal from './ConfirmModal';

export default function AdmissionSection() {
  const { admissionStartDate, admissionEndDate, admissionApplications, setAdmissionApplications, groups } = useData();
  const startDate = new Date(admissionStartDate);
  const endDate = new Date(admissionEndDate);
  const currentDate = new Date();
  
  const isAdmissionOpen = currentDate >= startDate && currentDate <= endDate;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', age: '', gender: '', address: '', contactNumber: '', fatherName: '', motherName: '', course: ''
  });

  const availableCourses = useMemo(() => {
    const allCourses = coursesData.flatMap(c => c.items);
    return allCourses.map(course => ({ value: course.name, label: course.name }));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    const newApplication = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'pending' as const
    };
    setAdmissionApplications([newApplication, ...admissionApplications]);
    setShowConfirm(false);
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', age: '', gender: '', address: '', contactNumber: '', fatherName: '', motherName: '', course: '' });
    }, 500);
  };

  return (
    <section id="admission" className="py-32 relative overflow-hidden bg-bg-base">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-cyan/30 mb-6">
            <span className="text-xs font-medium tracking-widest uppercase text-accent-cyan">
              Join TIEC
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            Admission <span className="gradient-text neon-text-purple">Portal</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
            Secure your seat for the upcoming batch. Admission window is strictly from {startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} to {endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}.
          </p>
        </motion.div>

        {!isAdmissionOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-12 rounded-2xl border border-red-500/30 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <CalendarX className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white">Admissions Closed</h3>
            <p className="text-text-secondary text-lg max-w-md">
              The admission window for the current session has expired. Please check back later for the next batch.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-12 rounded-2xl border border-accent-cyan/30 flex flex-col items-center gap-6 shadow-[0_0_40px_rgba(0,245,255,0.1)]"
          >
            <div className="w-20 h-20 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20">
              <CheckCircle2 className="w-10 h-10 text-accent-cyan" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white">Admissions are Open!</h3>
            <p className="text-text-secondary text-lg max-w-md mb-4">
              Click the button below to open the admission form and submit your application.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] flex items-center justify-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Admission Form <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-accent-cyan/30 shadow-[0_0_50px_rgba(0,245,255,0.15)] z-10"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12">
                {isSubmitted ? (
                  <div className="flex flex-col items-center text-center gap-6 py-10">
                    <div className="w-24 h-24 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20">
                      <CheckCircle2 className="w-12 h-12 text-accent-cyan" />
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-white">Application Received!</h3>
                    <p className="text-text-secondary text-lg max-w-md">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Your admission form has been successfully submitted. We will contact you shortly at {formData.contactNumber}.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-6 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-10 text-center">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Student <span className="gradient-text neon-text-cyan">Application</span>
                      </h2>
                      <p className="text-text-secondary">Fill out all the required details carefully.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="John Doe" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Google Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="youremail@gmail.com" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Age</label>
                          <div className="relative">
                            <input required type="number" min="10" max="100" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="18" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Gender</label>
                          <AnimatedDropdown 
                            options={[
                              { value: 'male', label: 'Male' },
                              { value: 'female', label: 'Female' },
                              { value: 'other', label: 'Other' }
                            ]}
                            value={formData.gender}
                            onChange={(val) => setFormData({...formData, gender: val})}
                            placeholder="Select Gender"
                            icon={<Users className="w-5 h-5" />}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Contact Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input required type="tel" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="+91 98765 43210" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Father's Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input required type="text" value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="Father's Full Name" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Mother's Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input required type="text" value={formData.motherName} onChange={(e) => setFormData({...formData, motherName: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" placeholder="Mother's Full Name" />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Full Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-6 w-5 h-5 text-text-secondary" />
                            <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all min-h-[100px]" placeholder="Enter your complete residential address" />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Select Course</label>
                          <AnimatedDropdown 
                            options={availableCourses}
                            value={formData.course}
                            onChange={(val) => setFormData({...formData, course: val})}
                            placeholder="Select a Course"
                            icon={<BookOpen className="w-5 h-5" />}
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold text-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all hover:scale-[1.01]">
                        Submit Application
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        title="Confirm Submission"
        message="Are you sure you want to submit your admission application? Please ensure all details are correct."
        confirmText="Submit Application"
        cancelText="Review Details"
        variant="info"
      />
    </section>
  );
}
