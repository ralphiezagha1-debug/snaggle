import { auth } from './app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';

export async function loginWithEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signupWithEmail(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  const prov = new GoogleAuthProvider();
  await signInWithPopup(auth, prov);
}

export async function logout() {
  await signOut(auth);
}

export function onAuthChanged(cb: (u: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}
