import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Calendar, Save, Terminal, CheckCircle2, Users, BookOpen, Bell, Plus, Trash2, Settings, MessageSquare, Check, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo from '../components/Logo';
import AnimatedDropdown from '../components/AnimatedDropdown';
import ConfirmModal from '../components/ConfirmModal';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { 
    currentUser, setCurrentUser,
    students, setStudents,
    groups, setGroups,
    notices, setNotices,
    admissionApplications, setAdmissionApplications,
    groupJoinRequests, setGroupJoinRequests,
    admissionStartDate, setAdmissionStartDate,
    admissionEndDate, setAdmissionEndDate
  } = useData();

  const [activeTab, setActiveTab] = useState('messages');
  const [message, setMessage] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // Form states
  const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '', groupId: '' });
  const [newGroup, setNewGroup] = useState({ name: '', course: '' });
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'General' });

  // Confirmation Modal State
  const [confirmAction, setConfirmAction] = useState<{ type: 'student' | 'group' | 'notice', id: string, name: string } | null>(null);

  useEffect(() => {
    if (currentUser !== 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (currentUser !== 'admin') return null;

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleSaveDates = (e: FormEvent) => {
    e.preventDefault();
    setMessage('Admission dates updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setStudents([...students, { ...newStudent, id, groupId: newStudent.groupId || null }]);
    setNewStudent({ name: '', email: '', password: '', groupId: '' });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    setConfirmAction(null);
  };

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setGroups([...groups, { id, name: newGroup.name, course: newGroup.course, members: 0, isJoined: false }]);
    setNewGroup({ name: '', course: '' });
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
    setStudents(students.map(s => s.groupId === id ? { ...s, groupId: null } : s));
    setConfirmAction(null);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setNotices([{ id, title: newNotice.title, content: newNotice.content, type: newNotice.type, date: new Date().toISOString() }, ...notices]);
    setNewNotice({ title: '', content: '', type: 'General' });
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
    setConfirmAction(null);
  };

  const handleApproveRequest = (requestId: string, studentId: string, groupId: string) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, groupId } : s));
    setGroupJoinRequests(groupJoinRequests.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
  };

  const handleRejectRequest = (requestId: string) => {
    setGroupJoinRequests(groupJoinRequests.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r));
  };

  const handleReviewApplication = (id: string) => {
    setAdmissionApplications(admissionApplications.map(a => a.id === id ? { ...a, status: 'reviewed' } : a));
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 flex flex-col md:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5">
          <Logo />
        </div>

        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'messages' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare className="w-5 h-5" /> Messages & Requests
            {(admissionApplications.filter(a => a.status === 'pending').length > 0 || groupJoinRequests.filter(r => r.status === 'pending').length > 0) && (
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'students' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" /> Manage Students
          </button>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'groups' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen className="w-5 h-5" /> Manage Groups
          </button>
          <button 
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'notices' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Bell className="w-5 h-5" /> Manage Notices
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'settings' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" /> Platform Settings
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
            Welcome back, <span className="gradient-text from-red-500 to-orange-500">Super Admin</span>
          </h1>
          <p className="text-text-secondary">Manage students, groups, notices, and platform settings.</p>
        </header>

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-red-400" /> Group Join Requests</h2>
              <div className="space-y-4">
                {groupJoinRequests.length === 0 ? (
                  <p className="text-text-secondary">No pending group join requests.</p>
                ) : (
                  groupJoinRequests.map(request => {
                    const student = students.find(s => s.id === request.studentId);
                    const group = groups.find(g => g.id === request.groupId);
                    if (!student || !group) return null;

                    return (
                      <div key={request.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-white font-medium">{student.name} <span className="text-text-secondary font-normal">wants to join</span> {group.name}</p>
                          <p className="text-xs text-text-secondary mt-1">{new Date(request.date).toLocaleString()}</p>
                        </div>
                        {request.status === 'pending' ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleApproveRequest(request.id, student.id, group.id)} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"><Check className="w-5 h-5" /></button>
                            <button onClick={() => handleRejectRequest(request.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><X className="w-5 h-5" /></button>
                          </div>
                        ) : (
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${request.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {request.status.toUpperCase()}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-red-400" /> Admission Applications</h2>
              <div className="space-y-4">
                {admissionApplications.length === 0 ? (
                  <p className="text-text-secondary">No admission applications received yet.</p>
                ) : (
                  admissionApplications.map(app => (
                    <div key={app.id} className="glass-panel p-4 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setSelectedApplication(selectedApplication === app.id ? null : app.id)}>
                        <div>
                          <p className="text-white font-medium">{app.name} <span className="text-text-secondary font-normal">applied for</span> {app.course}</p>
                          <p className="text-xs text-text-secondary mt-1">{new Date(app.date).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${app.status === 'reviewed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {app.status.toUpperCase()}
                          </span>
                          <button className="text-red-400 text-sm hover:underline">
                            {selectedApplication === app.id ? 'Hide Details' : 'View Details'}
                          </button>
                        </div>
                      </div>
                      
                      {selectedApplication === app.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div><span className="text-text-secondary">Email:</span> <span className="text-white">{app.email}</span></div>
                          <div><span className="text-text-secondary">Age:</span> <span className="text-white">{app.age}</span></div>
                          <div><span className="text-text-secondary">Gender:</span> <span className="text-white">{app.gender}</span></div>
                          <div><span className="text-text-secondary">Contact:</span> <span className="text-white">{app.contactNumber}</span></div>
                          <div><span className="text-text-secondary">Father's Name:</span> <span className="text-white">{app.fatherName}</span></div>
                          <div><span className="text-text-secondary">Mother's Name:</span> <span className="text-white">{app.motherName}</span></div>
                          <div className="md:col-span-2"><span className="text-text-secondary">Address:</span> <span className="text-white">{app.address}</span></div>
                          
                          {app.status === 'pending' && (
                            <div className="md:col-span-2 mt-4">
                              <button onClick={() => handleReviewApplication(app.id)} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium">
                                Mark as Reviewed
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'students' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-red-400" /> Add New Student</h2>
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase">Name</label>
                  <input required type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="Student Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase">Email (@tiec.edu)</label>
                  <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="student@tiec.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase">Password</label>
                  <input required type="text" value={newStudent.password} onChange={e => setNewStudent({...newStudent, password: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="Password" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase">Group</label>
                  <AnimatedDropdown 
                    options={[
                      { value: '', label: 'No Group' },
                      ...groups.map(g => ({ value: g.id, label: g.name }))
                    ]}
                    value={newStudent.groupId}
                    onChange={(val) => setNewStudent({...newStudent, groupId: val})}
                    placeholder="Select Group"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-bg-base font-bold hover:scale-[1.02] transition-transform">Add Student</button>
              </form>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Student List</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-text-secondary text-sm">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Password</th>
                      <th className="pb-3 font-medium">Group</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id} className="border-b border-white/5 text-white text-sm">
                        <td className="py-4">{student.name}</td>
                        <td className="py-4 text-red-400">{student.email}</td>
                        <td className="py-4 font-mono text-text-secondary">{student.password}</td>
                        <td className="py-4">{groups.find(g => g.id === student.groupId)?.name || 'None'}</td>
                        <td className="py-4 text-right">
                          <button onClick={() => setConfirmAction({ type: 'student', id: student.id, name: student.name })} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-red-400" /> Add New Group</h2>
              <form onSubmit={handleAddGroup} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <label className="text-xs text-text-secondary uppercase">Group Name</label>
                  <input required type="text" value={newGroup.name} onChange={e => setNewGroup({ ...newGroup, name: e.target.value })} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="e.g. Web Dev Batch B" />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-xs text-text-secondary uppercase">Course</label>
                  <input required type="text" value={newGroup.course} onChange={e => setNewGroup({ ...newGroup, course: e.target.value })} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="e.g. Web Development" />
                </div>
                <button type="submit" className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-bg-base font-bold hover:scale-[1.02] transition-transform">Create Group</button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map(group => {
                const memberCount = students.filter(s => s.groupId === group.id).length;
                return (
                  <div key={group.id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{group.name}</h3>
                      <p className="text-red-400 text-sm mb-2">{group.course}</p>
                      <p className="text-text-secondary text-sm mb-6">{memberCount} Students assigned</p>
                    </div>
                    <button onClick={() => setConfirmAction({ type: 'group', id: group.id, name: group.name })} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium">
                      <Trash2 className="w-4 h-4" /> Delete Group
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'notices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-red-400" /> Create Notice</h2>
              <form onSubmit={handleAddNotice} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary uppercase">Notice Title</label>
                    <input required type="text" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none" placeholder="Title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-text-secondary uppercase">Type</label>
                    <AnimatedDropdown 
                      options={[
                        { value: 'General', label: 'General' },
                        { value: 'Event', label: 'Event' },
                        { value: 'Academic', label: 'Academic' },
                        { value: 'Workshop', label: 'Workshop' }
                      ]}
                      value={newNotice.type}
                      onChange={(val) => setNewNotice({...newNotice, type: val})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase">Content</label>
                  <textarea required value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="w-full bg-bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] focus:outline-none min-h-[100px]" placeholder="Notice details..." />
                </div>
                <button type="submit" className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-bg-base font-bold hover:scale-[1.02] transition-transform">Publish Notice</button>
              </form>
            </div>

            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice.id} className="glass-panel p-6 rounded-2xl border border-white/10 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">{notice.type}</span>
                      <span className="text-text-secondary text-sm">{new Date(notice.date).toLocaleString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{notice.title}</h3>
                    <p className="text-text-secondary text-sm">{notice.content}</p>
                  </div>
                  <button onClick={() => setConfirmAction({ type: 'notice', id: notice.id, name: notice.title })} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-400" /> Admission Window Settings
            </h2>
            
            <form onSubmit={handleSaveDates} className="glass-panel p-8 rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col gap-6">
              {message && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5" /> {message}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Admission Start Date & Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={admissionStartDate.slice(0, 16)}
                  onChange={(e) => setAdmissionStartDate(new Date(e.target.value).toISOString())}
                  className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Admission End Date & Time</label>
                <input 
                  type="datetime-local" 
                  required
                  value={admissionEndDate.slice(0, 16)}
                  onChange={(e) => setAdmissionEndDate(new Date(e.target.value).toISOString())}
                  className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all" 
                />
              </div>

              <button
                type="submit"
                className="mt-4 group relative w-full py-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-bg-base font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Save Changes <Save className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </form>
          </motion.div>
        )}
      </main>

      <ConfirmModal 
        isOpen={confirmAction !== null}
        title={`Delete ${confirmAction?.type === 'student' ? 'Student' : confirmAction?.type === 'group' ? 'Group' : 'Notice'}`}
        message={`Are you sure you want to delete "${confirmAction?.name}"? This action cannot be undone.`}
        onConfirm={() => {
          if (confirmAction?.type === 'student') handleDeleteStudent(confirmAction.id);
          if (confirmAction?.type === 'group') handleDeleteGroup(confirmAction.id);
          if (confirmAction?.type === 'notice') handleDeleteNotice(confirmAction.id);
        }}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
