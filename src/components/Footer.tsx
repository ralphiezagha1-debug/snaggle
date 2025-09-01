import React from "react";
import { Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gavel className="w-5 h-5" />
          <span className="font-semibold">Snaggle</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Snaggle. All rights reserved. Bid responsibly.</p>
      </div>
    </footer>
  );
}
