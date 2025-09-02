import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase"; // <-- make sure this is your Firestore export
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function EmailSignUp() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(
    null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const trimmed = email.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setMsg({ type: "err", text: "Please enter a valid email." });
      return;
    }

    try {
      setBusy(true);
      await addDoc(collection(db, "waitlist"), {
        email: trimmed,
        createdAt: serverTimestamp(),
        source: "landing",
      });
      setMsg({ type: "ok", text: "You're on the list! 🎉" });
      setEmail("");
    } catch (err: any) {
      setMsg({
        type: "err",
        text:
          err?.code === "permission-denied"
            ? "Writes are blocked by Firestore rules."
            : "Something went wrong. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={busy}
        className="rounded-2xl"
        aria-label="Email address"
      />
      <Button type="submit" disabled={busy} className="rounded-2xl">
        {busy ? "Joining..." : "Join waitlist"}
      </Button>
      {msg && (
        <div
          className={`w-full text-sm mt-2 ${
            msg.type === "ok" ? "text-green-500" : "text-red-500"
          }`}
        >
          {msg.text}
        </div>
      )}
    </form>
  );
}
