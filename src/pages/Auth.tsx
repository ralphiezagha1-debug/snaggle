import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail, signupWithEmail, loginWithGoogle, onAuthChanged } from '@/platforms/firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => onAuthChanged(u => { if (u) nav('/'); }), [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    try {
      if (mode === 'login') await loginWithEmail(email, password);
      else await signupWithEmail(email, password);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <div className="flex gap-2">
          <Button type="submit" disabled={busy}>{mode === 'login' ? 'Sign In' : 'Sign Up'}</Button>
          <Button type="button" variant="secondary" onClick={()=>loginWithGoogle()} disabled={busy}>Google</Button>
          <Button type="button" variant="ghost" onClick={()=>setMode(m=>m==='login'?'signup':'login')}>
            {mode==='login' ? 'Create account' : 'I have an account'}
          </Button>
        </div>
      </form>
    </div>
  );
}
