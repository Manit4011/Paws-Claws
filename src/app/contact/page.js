'use client';

import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to an API later
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-emerald-700 drop-shadow-md">
          Get in <span className="text-yellow-500">Touch</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          Have a question, suggestion, or just want to say hi? Reach out to the Paws&Claws team!
        </p>
      </motion.section>

      {/* Animation */}
      <div className="flex justify-center mb-12">
        <div className="w-72 h-72">
          <DotLottieReact
            src="https://lottie.host/fe7e286a-e304-4e2a-91ef-558971056b56/wnCRpdN5L5.lottie"
            loop
            autoplay
          />
        </div>
      </div>

      {/* Contact Form */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-yellow-100"
      >
        {submitted ? (
          <div className="text-center text-green-600 text-lg font-medium">
            ✅ Thank you for reaching out! We’ll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition"
            >
              Send Message
            </button>
          </form>
        )}
      </motion.section>
    </main>
  );
}
