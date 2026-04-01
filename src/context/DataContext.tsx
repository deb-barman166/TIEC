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
};

export type Notice = { 
  id: string; 
  title: string; 
  content: string; 
  date: string; 
};

interface DataContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
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
    { id: 'g1', name: 'Web Dev Batch A' },
    { id: 'g2', name: 'Data Science Batch 1' }
  ]);
  const [notices, setNotices] = useState<Notice[]>([
    { id: 'n1', title: 'Welcome to TIEC', content: 'Classes for the new batch will commence next week. Please check your group assignments.', date: new Date().toISOString() }
  ]);
  const [admissionStartDate, setAdmissionStartDate] = useState('2026-02-20T00:00:00');
  const [admissionEndDate, setAdmissionEndDate] = useState('2026-04-20T23:59:59');
  const [currentUser, setCurrentUser] = useState<Student | 'admin' | null>(null);

  return (
    <DataContext.Provider value={{
      students, setStudents,
      groups, setGroups,
      notices, setNotices,
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
