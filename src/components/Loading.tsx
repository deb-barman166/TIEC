import { motion } from 'motion/react';
import Logo from './Logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-base flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-12"
      >
        <Logo />
      </motion.div>
      
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
