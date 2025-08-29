import React, { useState } from "react";

interface EmailCaptureProps {
  onSubmit?: (email: string) => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit?.(email);
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return <p className="text-green-500">Thanks for signing up!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="border border-border rounded px-3 py-2 w-64"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Notify Me
      </button>
    </form>
  );
};

export default EmailCapture;
