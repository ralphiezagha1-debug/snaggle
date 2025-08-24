import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CreditsContextType {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const CreditsContext = createContext<CreditsContextType | null>(null);

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('creditsBalance');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('creditsBalance', balance.toString());
  }, [balance]);

  const value = { balance, setBalance };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
