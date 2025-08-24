import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../lib/firebase';
import { debounce } from 'lodash-es';

interface CreditsContextType {
  credits: number;
  loading: boolean;
  setCredits: (credits: number) => void;
  refresh: () => void;
}

const CreditsContext = createContext<CreditsContextType | null>(null);

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const debouncedSetFirestoreCredits = useCallback(
    debounce((uid: string, newCredits: number) => {
      if (uid) {
        const walletRef = doc(db, `users/${uid}/wallet/main`);
        setDoc(walletRef, { balance: newCredits }, { merge: true });
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (user) {
      setLoading(true);
      const walletRef = doc(db, `users/${user.uid}/wallet/main`);
      const unsubscribe = onSnapshot(walletRef, (doc) => {
        if (doc.exists()) {
          setCredits(doc.data().balance);
        } else {
          setCredits(0);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      const savedCredits = localStorage.getItem('snaggle:credits');
      setCredits(savedCredits ? parseInt(savedCredits, 10) : 0);
      setLoading(false);
    }
  }, [user]);

  const handleSetCredits = (newCredits: number) => {
    setCredits(newCredits);
    if (user) {
      debouncedSetFirestoreCredits(user.uid, newCredits);
    } else {
      localStorage.setItem('snaggle:credits', newCredits.toString());
    }
  };

  const refresh = () => {
    if (user) {
      const walletRef = doc(db, `users/${user.uid}/wallet/main`);
      getDoc(walletRef).then((doc) => {
        if (doc.exists()) {
          setCredits(doc.data().balance);
        }
      });
    }
  };

  const value = { credits, loading, setCredits: handleSetCredits, refresh };

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
