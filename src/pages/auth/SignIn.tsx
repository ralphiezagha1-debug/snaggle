import { useState, FormEvent, ChangeEvent } from "react";
import { useAuth } from "@/state/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationState {
  from?: string;
}

export default function SignIn() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();
  const loc = useLocation();
  const from = (loc.state as LocationState | null)?.from || "/account";

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      nav(from, { replace: true });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Failed to sign in");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      nav(from, { replace: true });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Google sign-in failed");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={handleEmailSignIn} className="mt-6 space-y-3">
        <Input placeholder="Email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button type="submit">Sign in</Button>
        <Button variant="outline" onClick={handleGoogleSignIn}>Continue with Google</Button>
        <div className="text-sm text-slate-600">
          <Link to="/reset">Forgot password?</Link> • <Link to="/signup">Create account</Link>
        </div>
      </form>
    </div>
  );
}
