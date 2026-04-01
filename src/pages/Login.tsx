import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Login() {
  const navigate = useNavigate();
  const { students, setCurrentUser } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@tiec.edu')) {
      setError('Email must end with @tiec.edu');
      return;
    }

    if (email === 'superamid@tiec.edu' && password === '@password') {
      setCurrentUser('admin');
      navigate('/admin');
    } else if (email && password) {
      const student = students.find(s => s.email === email && s.password === password);
      if (student) {
        setCurrentUser(student);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please contact Super Admin.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-accent-purple/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-heading font-bold text-white mb-2">TIEC <span className="gradient-text neon-text-cyan">Portal</span></h1>
            <p className="text-text-secondary text-sm">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all" 
                  placeholder="student@tiec.edu" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-surface/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-purple text-bg-base font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 mt-8"
            >
              Sign In <LogIn className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
