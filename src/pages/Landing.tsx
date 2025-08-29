import React from "react";
import EmailCapture from "@/components/EmailCapture";

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Snaggle</h1>
      <p className="text-lg mb-4 text-muted">
        Be the first to know when we launch. Sign up below:
      </p>
      <EmailCapture onSubmit={(email) => console.log("Captured:", email)} />
    </div>
  );
};

export default Landing;
