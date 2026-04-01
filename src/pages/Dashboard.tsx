import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Bell, Users, BookOpen, UserPlus, CheckCircle2, Terminal } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notices, groups, students } = useData();
  const [activeTab, setActiveTab] = useState('notices');

  useEffect(() => {
    if (!currentUser || currentUser === 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser === 'admin') return null;

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const studentGroup = groups.find(g => g.id === currentUser.groupId);
  const groupMembers = students.filter(s => s.groupId === currentUser.groupId);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 flex flex-col md:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between md:justify-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center p-[1px]">
            <div className="w-full h-full bg-bg-surface rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-accent-cyan" />
            </div>
          </div>
          <span className="font-heading font-bold text-lg text-white">Student Portal</span>
        </div>

        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <button 
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'notices' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Bell className="w-5 h-5" /> Notices
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'students' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" /> Directory
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'groups' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen className="w-5 h-5" /> Study Groups
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            Welcome back, <span className="gradient-text neon-text-cyan">{currentUser.name}</span>
          </h1>
          <p className="text-text-secondary">Here's what's happening at TIEC today.</p>
        </header>

        {activeTab === 'notices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Bell className="w-5 h-5 text-accent-cyan" /> Latest Notices</h2>
            <div className="grid gap-4">
              {notices.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center text-text-secondary">
                  No notices available at the moment.
                </div>
              ) : (
                notices.map(notice => (
                  <div key={notice.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent-cyan/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-1 rounded-md bg-accent-purple/10 text-accent-purple text-xs font-medium border border-accent-purple/20">Notice</span>
                        <span className="text-text-secondary text-sm">{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                      <p className="text-text-secondary mt-2">{notice.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'students' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-accent-purple" /> Student Directory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map(student => {
                const sGroup = groups.find(g => g.id === student.groupId);
                return (
                  <div key={student.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent-purple/30 transition-all flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-bg-base font-bold text-lg shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{student.name}</h3>
                      <p className="text-text-secondary text-sm">{student.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan">
                        {sGroup?.name || 'No Group'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-accent-cyan" /> My Study Group</h2>
            <div className="glass-panel p-8 rounded-2xl border border-accent-cyan/30 bg-accent-cyan/5">
              <h3 className="text-2xl font-bold text-white mb-2">Group: <span className="text-accent-cyan">{studentGroup?.name || 'Unassigned'}</span></h3>
              <p className="text-text-secondary mb-6">Collaborate and study together with your peers.</p>
              
              <h4 className="text-lg font-medium text-white mb-4">Group Members</h4>
              {groupMembers.length === 0 ? (
                <p className="text-text-secondary">No members in this group yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {groupMembers.map(member => (
                    <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-xs font-bold text-accent-purple">
                        {member.name.charAt(0)}
                      </div>
                      <span className="text-sm text-white">{member.name} {member.id === currentUser.id ? '(You)' : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
