import { useState } from "react";
import { useAuth } from "@/state/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <div className="mt-6 space-y-3">
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button onClick={async ()=>{
          try { await signUpWithEmail(email, password); nav("/account"); }
          catch(e:any){ setErr(e.message || "Failed to sign up"); }
        }}>Create account</Button>
        <div className="text-sm text-slate-600">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
