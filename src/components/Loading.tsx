import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-base flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center p-[2px] mb-8 shadow-[0_0_50px_rgba(0,245,255,0.3)]"
      >
        <div className="w-full h-full bg-bg-surface rounded-2xl flex items-center justify-center">
          <Terminal className="w-12 h-12 text-accent-cyan" />
        </div>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-heading font-bold text-white tracking-widest mb-2"
      >
        TIEC
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-accent-cyan text-sm uppercase tracking-[0.3em] font-medium"
      >
        Loading Portal
      </motion.p>

      <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
        />
      </div>
    </div>
  );
}
