import React, { useState } from "react";
import { db, serverTimestamp } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const trimmed = email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!emailOk) {
      setMsg({ type: "err", text: "Please enter a valid email." });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "waitlist"), {
        email: trimmed,
        createdAt: serverTimestamp(),
        source: "landing"
      });

      // Success UX
      setMsg({ type: "ok", text: "You're on the list! Check your email for confirmation." });
      setEmail("");
    } catch (err) {
      console.error(err);
      setMsg({ type: "err", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false); // <-- ensures button never stays stuck
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-3 w-full max-w-xl">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full bg-muted/30 px-5 py-3 outline-none"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full px-6 py-3 font-semibold bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Joining..." : "Join Waitlist"}
      </button>
      {msg && (
        <p className={`mt-3 text-sm ${msg.type === "ok" ? "text-emerald-400" : "text-red-400"}`}>
          {msg.text}
        </p>
      )}
    </form>
  );
}
