import { useState, FormEvent, ChangeEvent } from "react";
import { useAuth } from "@/state/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Failed to send reset email");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <form onSubmit={handleResetPassword} className="mt-6 space-y-3">
        <Input placeholder="Your account email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        {sent ? (
          <p className="text-sm text-emerald-600">If an account exists, a reset email has been sent.</p>
        ) : (
          <Button type="submit">Send reset link</Button>
        )}
      </form>
    </div>
  );
}
