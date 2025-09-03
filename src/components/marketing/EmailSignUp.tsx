import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/api";

export default function EmailSignUp() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

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
      await joinWaitlist(trimmed);
      setMsg({ type: "ok", text: "You're on the list! 🎉" });
      setEmail("");
    } catch (err) {
      setMsg({ type: "err", text: "Couldn’t join. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
      <Input
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        disabled={busy}
        className="rounded-2xl w-full sm:w-auto"
        placeholder="you@example.com"
        aria-label="Email address"
        type="email"
        required
      />
      <Button type="submit" disabled={busy} className="rounded-2xl">
        {busy ? "Joining..." : "Join waitlist"}
      </Button>
      {msg && (
        <div
          role="status"
          className={msg.type === "ok" ? "text-green-400 text-sm" : "text-red-400 text-sm"}
        >
          {msg.text}
        </div>
      )}
    </form>
  );
}