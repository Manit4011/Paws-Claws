'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white border-t border-gray-800 px-6 py-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            <span className="text-amber-400">Paws</span>
            <span className="text-emerald-400">&Claws</span>
          </h1>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Giving every paw a home. <br />
            Adopt. Rescue. Love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-emerald-300">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-all">Home</Link>
            </li>
            <li>
              <Link href="/adopt" className="hover:text-emerald-400 transition-all">Adopt</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-all">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition-all">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-emerald-300">Follow Us</h2>
          <div className="flex space-x-5 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="hover:text-blue-500 transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="hover:text-sky-400 transition-all" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="hover:text-pink-500 transition-all" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="hover:text-gray-300 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} Paws&Claws. All rights reserved.
      </div>
    </footer>
  );
}

