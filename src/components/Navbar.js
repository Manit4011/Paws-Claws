'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import UserContext from '@/context/userContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const actualUser = user === undefined ? undefined : user?.user;
  console.log("actualUser", actualUser);
  const router = useRouter();

  const handleLogout = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.status === 200) {
        console.log("Logout successful");
        setUser(null); // Clear user context
        router.push('/login'); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MyApp
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
          </div>


          <div className="hidden md:flex space-x-4 items-center">
            {user === undefined ? null : actualUser ? (
              <>
                <span className="text-gray-700">Welcome, {actualUser.name}
                </span>
                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-400 transition">
                  Logout
                </button>

              </>
            ) : (
              <>
                <Link href="/login" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-cyan-500 text-black py-2 px-4 rounded-full hover:bg-cyan-400 transition">
                  Sign Up
                </Link>
              </>
            )}

          </div>



          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow">
          <Link href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-500">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
