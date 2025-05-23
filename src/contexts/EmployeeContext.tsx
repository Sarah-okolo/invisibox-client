
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmployeeSession {
  anonymousEmail: string;
  companyChannel: string;
  isActive: boolean;
}

interface EmployeeContextType {
  session: EmployeeSession | null;
  setSession: (session: EmployeeSession | null) => void;
  validateAnonymousEmail: (email: string) => Promise<boolean>;
  subscribe: (realEmail: string, companyChannel: string) => Promise<string>;
  unsubscribe: (realEmail: string, companyChannel: string, proxyEmail: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}

interface EmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [session, setSession] = useState<EmployeeSession | null>(null);

  const validateAnonymousEmail = async (email: string): Promise<boolean> => {
    // Simulate API call to validate anonymous email
    await new Promise(resolve => setTimeout(resolve, 500));
    return email.includes('@invisibox.com') && email.startsWith('emp');
  };

  const subscribe = async (realEmail: string, companyChannel: string): Promise<string> => {
    // Simulate API call to subscribe
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock anonymous email
    const randomId = Math.random().toString(36).substring(2, 9);
    const anonymousEmail = `emp${randomId}@invisibox.com`;
    
    return anonymousEmail;
  };

  const unsubscribe = async (realEmail: string, companyChannel: string, proxyEmail: string): Promise<void> => {
    // Simulate API call to unsubscribe
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear session if it matches
    if (session?.anonymousEmail === proxyEmail) {
      setSession(null);
    }
  };

  const value: EmployeeContextType = {
    session,
    setSession,
    validateAnonymousEmail,
    subscribe,
    unsubscribe
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}
