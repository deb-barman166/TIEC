import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Code, Cpu, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-purple/20 rounded-full blur-[150px] mix-blend-screen animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-accent-cyan/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-xs font-medium tracking-widest uppercase text-accent-cyan">
            Admissions Open 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.1] mb-6"
        >
          Upgrade Your Skills. <br />
          <span className="gradient-text neon-text-purple">Build Your Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Join Tufanganj IT Education Centre (TIEC). Premium computer training powered by E-Max. 
          Master the technologies of tomorrow, today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href="#courses"
            className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,245,255,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 rounded-lg glass-panel text-text-primary font-medium text-lg hover:bg-white/5 transition-all border border-white/10 hover:border-accent-cyan/50"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute hidden lg:block left-10 top-1/3"
        >
          <div className="p-4 rounded-2xl glass-panel animate-bounce" style={{ animationDuration: '4s' }}>
            <Code className="w-8 h-8 text-accent-cyan" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute hidden lg:block right-20 top-1/4"
        >
          <div className="p-4 rounded-2xl glass-panel animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <Globe className="w-8 h-8 text-accent-purple" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute hidden lg:block right-32 bottom-1/3"
        >
          <div className="p-4 rounded-2xl glass-panel animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
            <Cpu className="w-8 h-8 text-accent-cyan" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-secondary uppercase tracking-widest">Scroll Down</span>
        <ChevronDown className="w-5 h-5 text-accent-cyan animate-bounce" />
      </motion.div>
    </section>
  );
}
