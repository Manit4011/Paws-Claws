'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import UserContext from '@/context/userContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const actualUser = user?.user;
  console.log("Actual User:", actualUser);
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
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="bg-black text-white shadow-md fixed top-0 w-full z-50 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-wide flex items-center space-x-1">
          <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
            Paws
          </span>
          <span className="text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]">
            &Claws
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 font-medium text-sm">
          <Link href="/" className="hover:text-indigo-400 transition-all">Home</Link>
          <Link href="/about" className="hover:text-indigo-400 transition-all">About</Link>
          <Link href="/contact" className="hover:text-indigo-400 transition-all">Contact</Link>
          {actualUser && (
            <Link href="/saved" className="hover:text-indigo-400 transition-all">Saved Pets</Link>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user === undefined ? null : actualUser ? (
            <>
              <div className="flex items-center space-x-2 text-gray-300">
                <img
                  src={actualUser.profileUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mMNz8YCBvYmnr3BQUPX__YsC_WtDuAevwg&s'} // fallback if no image
                  alt="User"
                  className="w-10 h-10 rounded-full border border-white object-cover"
                />
                <span>{actualUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-full"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-pink-400 hover:bg-pink-500 text-black px-4 py-1.5 rounded-full"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-white">
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
            className="md:hidden bg-black text-white border-t border-gray-800 px-4 pb-4 pt-2"
          >
            <Link href="/" className="block py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="block py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="block py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Contact</Link>
            {actualUser && (
              <Link href="/saved" className="block py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Saved Pets</Link>
            )}

            {user === undefined ? null : actualUser ? (
              <>
                <div className="flex items-center space-x-2 mt-4">
                  <img
                    src={actualUser.image || '/default-avatar.png'}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-white object-cover"
                  />
                  <p className="text-gray-300">{actualUser.name}</p>
                </div>
                <button
                  onClick={(e) => { handleLogout(e); setIsOpen(false); }}
                  className="block w-full text-left py-2 mt-2 text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 hover:text-indigo-400" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/signup" className="block py-2 hover:text-pink-400" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
