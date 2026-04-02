import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Student = { 
  id: string; 
  name: string; 
  email: string; 
  password: string; 
  groupId: string | null;
};

export type Group = { 
  id: string; 
  name: string; 
  course: string;
};

export type Notice = { 
  id: string; 
  title: string; 
  content: string; 
  type: string;
  date: string; 
};

export type AdmissionApplication = {
  id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  fatherName: string;
  motherName: string;
  course: string;
  date: string;
  status: 'pending' | 'reviewed';
};

export type GroupJoinRequest = {
  id: string;
  studentId: string;
  groupId: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
};

interface DataContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  admissionApplications: AdmissionApplication[];
  setAdmissionApplications: React.Dispatch<React.SetStateAction<AdmissionApplication[]>>;
  groupJoinRequests: GroupJoinRequest[];
  setGroupJoinRequests: React.Dispatch<React.SetStateAction<GroupJoinRequest[]>>;
  admissionStartDate: string;
  setAdmissionStartDate: (date: string) => void;
  admissionEndDate: string;
  setAdmissionEndDate: (date: string) => void;
  currentUser: Student | 'admin' | null;
  setCurrentUser: (user: Student | 'admin' | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alice Smith', email: 'alice@tiec.edu', password: 'password123', groupId: 'g1' }
  ]);
  const [groups, setGroups] = useState<Group[]>([
    { id: 'g1', name: 'Web Dev Batch A', course: 'Web Development' },
    { id: 'g2', name: 'Data Science Batch 1', course: 'Data Science' }
  ]);
  const [notices, setNotices] = useState<Notice[]>([
    { id: 'n1', title: 'Welcome to TIEC', content: 'Classes for the new batch will commence next week. Please check your group assignments.', type: 'General', date: new Date().toISOString() }
  ]);
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>([]);
  const [groupJoinRequests, setGroupJoinRequests] = useState<GroupJoinRequest[]>([]);
  const [admissionStartDate, setAdmissionStartDate] = useState('2026-02-20T00:00:00');
  const [admissionEndDate, setAdmissionEndDate] = useState('2026-04-20T23:59:59');
  const [currentUser, setCurrentUser] = useState<Student | 'admin' | null>(null);

  return (
    <DataContext.Provider value={{
      students, setStudents,
      groups, setGroups,
      notices, setNotices,
      admissionApplications, setAdmissionApplications,
      groupJoinRequests, setGroupJoinRequests,
      admissionStartDate, setAdmissionStartDate,
      admissionEndDate, setAdmissionEndDate,
      currentUser, setCurrentUser
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
