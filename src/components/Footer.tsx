import React from "react";
import { Link } from "react-router-dom";
import { Gavel } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gavel className="w-5 h-5" />
          <span className="font-semibold text-foreground">Snaggle</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Snaggle. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/health" className="hover:text-primary">
            Health
          </Link>
        </p>
      </div>
    </footer>
  );
};
