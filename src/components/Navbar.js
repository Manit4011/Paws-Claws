'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const centerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Adopt', href: '/adopt' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  {name: 'Saved',href : '/saved'},
];

const rightLinks = [
  { name: 'Login', href: '/login' },
  { name: 'Signup', href: '/signup' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-black bg-opacity-80 shadow-lg backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white tracking-widest">
          <span className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
            Paws
          </span>
          <span className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
            &Claws
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-8 mx-auto">
          {centerLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1, color: '#a855f7' }}
              className="text-white transition-all duration-300"
            >
              <Link href={link.href}>{link.name}</Link>
            </motion.div>
          ))}
        </div>

        {/* Right Auth Links */}
        <div className="hidden md:flex space-x-4">
          {rightLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              className="text-white transition-all duration-300"
            >
              <Link href={link.href}>{link.name}</Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden bg-black bg-opacity-90"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {[...centerLinks, ...rightLinks].map((link) => (
                <motion.div
                  key={link.name}
                  whileTap={{ scale: 0.95 }}
                  className="text-white text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={link.href}>{link.name}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
