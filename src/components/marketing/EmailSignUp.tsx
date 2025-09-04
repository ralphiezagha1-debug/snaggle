import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/api";

export default function EmailSignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await joinWaitlist(trimmed);
      toast.success("You're on the list!", {
        description: "We'll notify you at launch. Thanks for your interest!",
      });
      setEmail("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start w-full">
      <div className="relative flex-1 w-full">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full"
          placeholder="you@example.com"
          aria-label="Email address"
          type="email"
          required
        />
        {error && (
          <p className="absolute -bottom-5 left-0 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" disabled={loading} className="font-semibold">
        {loading ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
}