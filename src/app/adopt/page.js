'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import UserContext from '@/context/userContext';
import Loader from '@/components/Loader';

export default function PetTinder() {
  const { user } = useContext(UserContext);
  const actualUser = user?.user;
  const userid = actualUser?._id;

  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await axios.get('/api/scrape');
        const shuffled = response.data.pets.sort(() => 0.5 - Math.random());
        setPets(shuffled);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    }
    fetchPets();
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + newDirection + pets.length) % pets.length);
    }, 250); // matches exit animation
  };

  const saveForLater = async (pet) => {
    if (!userid) {
      setMessage('Please log in to save pets.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await axios.post('/api/saveforlater', {
        petName: pet.petName || pet.petname,
        gender: pet.gender,
        location: pet.location,
        ownerName: pet.ownerName || pet.owner,
        postedOn: pet.postedOn,
        age: pet.age,
        imageUrl: pet.imageUrl,
        adoptionLink: pet.adoptionLink,
        userid,
      });
      setMessage('Pet saved for later!');
    } catch (error) {
      console.error('Error saving pet:', error);
      setMessage('Failed to save pet.');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const currentPet = pets[currentIndex];
  if (!currentPet) return <Loader />;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      zIndex: 0,
    }),
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 bg-gradient-to-br from-amber-50 to-emerald-100">
      {message && (
        <div className="mb-5 px-6 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 text-white bg-emerald-500">
          {message}
        </div>
      )}

      <div className="relative w-full max-w-md h-[620px]">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentPet.imageUrl + currentIndex}
            className="absolute top-0 left-0 w-full h-full bg-[#fffdf7] rounded-3xl shadow-xl border border-gray-200 p-6 flex flex-col"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 100 && Math.abs(velocity.x) > 0.5;
              if (swipe) {
                paginate(offset.x < 0 ? 1 : -1);
              }
            }}
          >
            <h2 className="text-center text-3xl font-semibold text-gray-500 mb-4 tracking-wide">
              {currentPet.petName || currentPet.petname}
            </h2>

            <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-inner">
              <Image
                src={currentPet.imageUrl}
                alt={currentPet.petName || currentPet.petname}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-800 leading-relaxed px-1 flex-1">
              <p><span className="font-medium text-gray-600">Posted:</span> {currentPet.postedOn}</p>
              <p><span className="font-medium text-gray-600">Gender:</span> {currentPet.gender}</p>
              <p><span className="font-medium text-gray-600">Age:</span> {currentPet.age}</p>
              <p><span className="font-medium text-gray-600">Location:</span> {currentPet.location}</p>
              <p><span className="font-medium text-gray-600">Owner:</span> {currentPet.ownerName || currentPet.owner}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => saveForLater(currentPet)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium shadow-md transition"
              >
                Save
              </button>
              <a
                href={currentPet.adoptionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl font-medium text-center shadow-md transition"
              >
                Adopt
              </a>
              <button
                onClick={() => paginate(1)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-xl font-medium shadow-md transition"
              >
                Next
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}