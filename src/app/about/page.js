'use client';

import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-emerald-700 drop-shadow-md">
          About <span className="text-yellow-500">Paws&Claws</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          We believe every paw deserves a loving home. Learn more about our mission and the team behind this initiative.
        </p>
      </motion.section>

      {/* Animation */}
      <div className="flex justify-center mb-12">
        <div className="w-72 h-72">
          <DotLottieReact
            src="https://lottie.host/3950e2bb-2c21-47ac-b6cd-bb73b3aa7dfd/wEkz2gA0pQ.lottie"
            loop
            autoplay
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow-lg p-6 border border-emerald-100"
        >
          <h2 className="text-2xl font-bold text-emerald-700 mb-3">🐶 Our Mission</h2>
          <p className="text-gray-600">
            To connect homeless pets with compassionate humans using technology. We aim to simplify the adoption process and spread awareness about responsible pet ownership.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow-lg p-6 border border-yellow-100"
        >
          <h2 className="text-2xl font-bold text-yellow-600 mb-3">🐾 Our Vision</h2>
          <p className="text-gray-600">
            A world where no animal is left without a home. Through innovation and collaboration, we envision a society where pets are loved, protected, and adopted into safe families.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet the Creator</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
          <img
            src="/your-avatar.png"
            alt="Creator"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-md object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Manit Nayak</h3>
            <p className="text-gray-500 text-sm">Full Stack Developer & Animal Lover</p>
            <p className="text-gray-600 mt-2 max-w-md">
              I built this platform to combine my love for coding and compassion for animals.
              Let’s build a better future for our furry friends together! 🐕🐾
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
