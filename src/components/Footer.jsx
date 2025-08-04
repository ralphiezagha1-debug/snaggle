"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8">
      <p className="text-gray-500 text-sm">&copy; {year} Snaggle. All rights reserved.</p>
    </footer>
  );
}
