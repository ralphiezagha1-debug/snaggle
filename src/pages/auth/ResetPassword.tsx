import { useState } from "react";
import { useAuth } from "@/state/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <div className="mt-6 space-y-3">
        <Input placeholder="Your account email" value={email} onChange={e=>setEmail(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        {sent ? (
          <p className="text-sm text-emerald-600">If an account exists, a reset email has been sent.</p>
        ) : (
          <Button onClick={async ()=>{
            try { await sendPasswordReset(email); setSent(true); }
            catch(e:any){ setErr(e.message || "Failed to send reset email"); }
          }}>Send reset link</Button>
        )}
      </div>
    </div>
  );
}
