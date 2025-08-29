import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase"; // must export a Firestore 'db' in your project

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }
    try {
      setStatus("loading");
      await addDoc(collection(db, "waitlist"), {
        email: email.toLowerCase(),
        createdAt: serverTimestamp(),
        source: "landing",
      });
      setStatus("success");
      setMessage("You're on the list! Check your inbox soon.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to claim early access"
        className="flex-1 rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        disabled={status==="loading"}
        required
      />
      <button
        type="submit"
        disabled={status==="loading"}
        className="px-5 py-3 rounded-xl bg-emerald-500 font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {status==="loading" ? "Joining..." : "Join Waitlist"}
      </button>
      {message && (
        <div className="sr-only" aria-live="polite">{message}</div>
      )}
    </form>
  );
}
