'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 px-6 py-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
              Paws
            </span>
            <span className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
              &Claws
            </span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Giving every paw a home. Adopt. Rescue. Love.  
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-2 text-indigo-300">Quick Links</h2>
          <Link href="/" className="hover:text-indigo-400 transition-all duration-200">Home</Link>
          <Link href="/adopt" className="hover:text-indigo-400 transition-all duration-200">Adopt</Link>
          <Link href="/about" className="hover:text-indigo-400 transition-all duration-200">About</Link>
          <Link href="/contact" className="hover:text-indigo-400 transition-all duration-200">Contact</Link>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-indigo-300">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="hover:text-blue-500 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-sky-400 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="hover:text-pink-500 transition-all" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="hover:text-gray-300 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Paws&Claws. All rights reserved.
      </div>
    </footer>
  );
}
