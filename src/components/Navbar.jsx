"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Snaggle</Link>
        </div>
        <div className="space-x-4 hidden md:block">
          <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link href="/auctions" className="text-gray-700 hover:text-blue-500">Auctions</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-500">FAQ</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
