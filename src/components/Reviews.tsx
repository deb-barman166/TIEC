import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rahul Sharma',
    course: 'DITA',
    text: 'The best computer training institute in Tufanganj. The faculty is highly experienced and the practical sessions are incredibly helpful. I secured a job right after completing my diploma.',
    rating: 5,
  },
  {
    name: 'Priya Das',
    course: 'Web Development',
    text: 'TIEC transformed my career. The Web Designing & Development course was comprehensive and up-to-date with current industry standards. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    course: 'Tally GST',
    text: 'Excellent infrastructure and supportive teachers. The Tally GST training gave me the practical knowledge I needed to manage accounts confidently.',
    rating: 4.5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 relative overflow-hidden bg-bg-base">
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
              Student Success
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
            What Our <span className="gradient-text neon-text-purple">Students Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-text-secondary max-w-2xl mx-auto font-light">
            <span className="font-bold text-white text-2xl">4.9</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span>(39 Reviews)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-all duration-300 group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Quote className="w-10 h-10 text-accent-purple/20 mb-6 relative z-10" />
              
              <p className="text-text-secondary leading-relaxed mb-8 flex-grow relative z-10 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
                <div>
                  <h4 className="font-heading font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {review.name}
                  </h4>
                  <span className="text-xs text-accent-purple uppercase tracking-wider font-medium">
                    {review.course}
                  </span>
                </div>
                <div className="flex">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  {review.rating % 1 !== 0 && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-50" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
