import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Bell, Users, BookOpen, UserPlus, CheckCircle2, Terminal, MessageSquare, User, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo from '../components/Logo';

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notices, groups, students, groupJoinRequests, setGroupJoinRequests } = useData();
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleRequestJoin = (groupId: string) => {
    const existingRequest = groupJoinRequests.find(r => r.studentId === currentUser.id && r.groupId === groupId && r.status === 'pending');
    if (existingRequest) return;

    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: currentUser.id,
      groupId,
      date: new Date().toISOString(),
      status: 'pending' as const
    };
    setGroupJoinRequests([newRequest, ...groupJoinRequests]);
  };

  const studentGroup = groups.find(g => g.id === currentUser.groupId);
  const myRequests = groupJoinRequests.filter(r => r.studentId === currentUser.id);

  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 flex flex-col md:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5">
          <Logo />
        </div>

        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Terminal className="w-5 h-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'messages' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
          <button 
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'notices' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Bell className="w-5 h-5" /> Notices
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'groups' ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen className="w-5 h-5" /> Groups
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <User className="w-5 h-5" /> Profile
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

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-text-secondary text-sm font-medium mb-2">Current Group</h3>
                <p className="text-2xl font-bold text-white">{studentGroup?.name || 'Not Assigned'}</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-text-secondary text-sm font-medium mb-2">New Notices</h3>
                <p className="text-2xl font-bold text-white">{notices.length}</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-text-secondary text-sm font-medium mb-2">Pending Requests</h3>
                <p className="text-2xl font-bold text-white">{myRequests.filter(r => r.status === 'pending').length}</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><MessageSquare className="w-5 h-5 text-accent-purple" /> Messages & Updates</h2>
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              {myRequests.length === 0 ? (
                <p className="text-text-secondary">No messages or request updates.</p>
              ) : (
                <div className="space-y-4">
                  {myRequests.map(req => {
                    const group = groups.find(g => g.id === req.groupId);
                    return (
                      <div key={req.id} className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <p className="text-white">
                          Your request to join <span className="font-bold text-accent-cyan">{group?.name}</span> is currently <span className={`font-bold ${req.status === 'approved' ? 'text-green-400' : req.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'}`}>{req.status}</span>.
                        </p>
                        <p className="text-xs text-text-secondary mt-2">{new Date(req.date).toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

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

        {activeTab === 'groups' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {studentGroup && (
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4"><BookOpen className="w-5 h-5 text-accent-cyan" /> My Study Group</h2>
                <div className="glass-panel p-8 rounded-2xl border border-accent-cyan/30 bg-accent-cyan/5">
                  <h3 className="text-2xl font-bold text-white mb-2">Group: <span className="text-accent-cyan">{studentGroup.name}</span></h3>
                  <p className="text-text-secondary mb-6">Collaborate and study together with your peers.</p>
                  
                  <h4 className="text-lg font-medium text-white mb-4">Group Members</h4>
                  {students.filter(s => s.groupId === studentGroup.id).length === 0 ? (
                    <p className="text-text-secondary">No members in this group yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {students.filter(s => s.groupId === studentGroup.id).map(member => (
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
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-accent-purple" /> All Groups & Members</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groups.map(group => {
                  const hasRequested = myRequests.some(r => r.groupId === group.id && r.status === 'pending');
                  const groupStudents = students.filter(s => s.groupId === group.id);
                  const isExpanded = expandedGroup === group.id;

                  return (
                    <div key={group.id} className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                      <div className="p-6 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{group.name}</h3>
                            <span className="px-2.5 py-1 rounded-md bg-white/5 text-text-secondary text-xs font-medium border border-white/10">
                              {groupStudents.length} Members
                            </span>
                          </div>
                          <p className="text-accent-purple text-sm mb-6">{group.course}</p>
                        </div>
                        
                        <div className="flex gap-3 mt-auto">
                          <button 
                            onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10"
                          >
                            {isExpanded ? 'Hide Members' : 'View Members'}
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>
                          
                          {group.id !== currentUser.groupId && (
                            hasRequested ? (
                              <div className="flex-1 py-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 text-center text-sm font-medium border border-yellow-500/20">
                                Request Pending
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleRequestJoin(group.id)}
                                className="flex-1 py-2.5 rounded-xl bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan text-sm font-medium transition-colors border border-accent-cyan/20"
                              >
                                Request to Join
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-t border-white/10 bg-black/20"
                          >
                            <div className="p-6">
                              {groupStudents.length === 0 ? (
                                <p className="text-sm text-text-secondary text-center py-4">No students assigned to this group yet.</p>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {groupStudents.map(student => (
                                    <div key={student.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-[10px] font-bold text-bg-base shrink-0">
                                        {student.name.charAt(0)}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-sm text-white truncate">{student.name}</p>
                                        <p className="text-[10px] text-text-secondary truncate">{student.email}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><User className="w-5 h-5 text-accent-cyan" /> My Profile</h2>
            <div className="glass-panel p-8 rounded-2xl border border-white/10 max-w-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-bg-base font-bold text-4xl">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentUser.name}</h3>
                  <p className="text-text-secondary">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Student ID</p>
                  <p className="text-white font-mono">{currentUser.id}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Current Group</p>
                  <p className="text-white">{studentGroup?.name || 'Not assigned to any group yet.'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
