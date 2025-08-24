import { useAuth } from '../state/auth';
import { Button } from '@/components/ui/button';
import { auth } from '../lib/firebase';

export default function Account() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Account</h1>
      <div className="mt-8 space-y-4">
        <p><span className="font-bold">Display Name:</span> {user.displayName}</p>
        <p><span className="font-bold">Email:</span> {user.email}</p>
        <p><span className="font-bold">UID:</span> {user.uid}</p>
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      </div>
    </div>
  );
}
