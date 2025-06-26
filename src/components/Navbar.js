'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import UserContext from '@/context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import LogoAnimation from './LogoAnimation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const actualUser = user?.user;
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.status === 200) {
        setUser(null);
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (user === undefined) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="bg-[#1e1e1e]/90 backdrop-blur-lg text-white fixed top-0 w-full z-50 border-b border-gray-700 shadow-sm font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <LogoAnimation />
          <Link href="/" className="text-2xl font-semibold tracking-wide flex items-center space-x-1">
            <span className="text-amber-400">Paws</span>
            <span className="text-emerald-400">&Claws</span>
          </Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/about" className="hover:text-emerald-400 transition">About</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
          <Link href="/adopt" className="hover:text-emerald-400 transition">Adopt</Link>
          {actualUser && (
            <Link href="/saved" className="hover:text-emerald-400 transition">Saved Pets</Link>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {actualUser ? (
            <>
              <div className="flex items-center space-x-2">
                {actualUser.profileUrl ? (
                  <img
                    src={actualUser.profileUrl}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border border-gray-600 transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-700 border border-gray-600 animate-pulse" />
                )}
                <span className="text-sm text-gray-300 font-medium">{actualUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-full transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-full transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-amber-400 hover:bg-amber-500 text-black text-sm px-4 py-1.5 rounded-full transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#1e1e1e] text-white border-t border-gray-700 px-4 pb-4 pt-2"
          >
            <Link href="/" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/adopt" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>Adopt</Link>
            {actualUser && (
              <Link href="/saved" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>Saved Pets</Link>
            )}

            {actualUser ? (
              <>
                <div className="flex items-center space-x-2 mt-4">
                  {actualUser.profileUrl ? (
                    <img
                      src={actualUser.profileUrl}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover border border-gray-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 animate-pulse" />
                  )}
                  <p className="text-sm text-gray-300 font-medium">{actualUser.name}</p>
                </div>
                <button
                  onClick={(e) => { handleLogout(e); setIsOpen(false); }}
                  className="block w-full text-left py-2 mt-2 text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 hover:text-emerald-400" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/signup" className="block py-2 hover:text-amber-400" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
