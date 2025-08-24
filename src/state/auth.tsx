import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  sendPasswordReset: (email: string) => Promise<any>;
  signOut: () => Promise<any>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            lastLoginAt: new Date(),
            roles: { user: true },
          });
        } else {
          await setDoc(userRef, { lastLoginAt: new Date() }, { merge: true });
        }
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const signUpWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const sendPasswordReset = (email: string) => sendPasswordResetEmail(auth, email);
  const signOut = () => auth.signOut();
  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (user) {
      await firebaseUpdateProfile(user, data);
    }
  };

  const value = { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, sendPasswordReset, signOut, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
