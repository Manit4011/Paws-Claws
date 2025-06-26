"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-6 pt-32 pb-20 overflow-hidden relative">
      {/* Sparkle background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none animate-pulseSlow">
        <DotLottieReact
          src="https://lottie.host/321bf35b-1bcc-4366-9fbd-d3aaf61c2cca/dLmo7eVFg4.lottie"
          loop
          autoplay
        />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-emerald-700 drop-shadow-lg">
          Welcome to <span className="text-yellow-500">Paws&Claws</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Discover your next best furry friend. Adopt, love, and give them a home.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/adopt"
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-md transition transform hover:scale-105"
          >
            Browse Pets
          </Link>
          <Link
            href="/about"
            className="border border-yellow-500 text-yellow-500 hover:bg-yellow-100 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </motion.section>

      {/* Lottie Mascot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-20 flex justify-center z-10 relative"
      >
        {/* <div className="w-80 h-80">
          <DotLottieReact
            src="https://lottie.host/4ed1bdb1-927b-438f-84de-2f3f8022a870/LTVe3D9olB.lottie"
            loop
            autoplay
          />
        </div> */}
      </motion.div>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-32 max-w-4xl mx-auto text-center z-10 relative"
      >
        <h2 className="text-3xl font-bold text-emerald-700 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg">
          We believe every paw deserves a loving home. We connect you to the right companion—whether it barks, meows, or squeaks.
        </p>
      </motion.section>
    </main>
  );
}
