import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container-xl py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Snaggle. All rights reserved.
      </div>
    </footer>
  );
}
