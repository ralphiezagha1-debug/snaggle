import { useEffect, useState } from 'react';
import { onAuthChanged, logout } from '@/platforms/firebase/auth';
import { loadBidApi } from '@/api';
import type { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => onAuthChanged(setUser), []);

  useEffect(() => {
    (async () => {
      if (!user) { setCredits(null); return; }
      try {
        const api = await loadBidApi();
        const uc = await api.getCredits(user.uid);
        setCredits(uc?.balance ?? 0);
      } catch {
        setCredits(null);
      }
    })();
  }, [user]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user ? (
        <div className="space-y-2">
          <div><b>UID:</b> {user.uid}</div>
          <div><b>Email:</b> {user.email ?? '(none)'}</div>
          <div><b>Credits:</b> {credits ?? '—'}</div>
          <Button onClick={()=>logout()}>Sign out</Button>
        </div>
      ) : (
        <div>Not signed in.</div>
      )}
    </div>
  );
}
