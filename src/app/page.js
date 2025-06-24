'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function PetTinder() {
  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdoptionLink, setShowAdoptionLink] = useState(false);
  const [fade, setFade] = useState(true);
  const [message, setMessage] = useState('');
  const [userid, setUserid] = useState('685a51ac0426d2bb60d85009');

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

  const saveForLater = async (pet) => {
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
        userid: userid
      });

      setMessage('✅ Pet saved for later!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving pet:', error);
      setMessage('❌ Failed to save pet.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const nextPet = () => {
    setFade(false);
    setTimeout(() => {
      setShowAdoptionLink(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pets.length);
      setFade(true);
    }, 300);
  };

  const currentPet = pets[currentIndex];

  if (!currentPet) {
    return <p className="text-center mt-20 text-xl">Loading pets...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-800 tracking-wide drop-shadow-md">🐾 Paws & Claws</h1>

      {message && (
        <div className="mb-4 px-5 py-2 rounded-lg bg-green-100 text-green-800 font-medium shadow-md">
          {message}
        </div>
      )}

      <div
        className={`w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {currentPet.petName || currentPet.petname}
        </h2>

        <div className="relative w-full h-72 mb-4 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={currentPet.imageUrl}
            alt={currentPet.petName || currentPet.petname}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="text-gray-600 space-y-2 text-sm font-medium">
          <p><span className="text-gray-800">📅 Posted:</span> {currentPet.postedOn}</p>
          <p><span className="text-gray-800">⚧ Gender:</span> {currentPet.gender}</p>
          <p><span className="text-gray-800">🎂 Age:</span> {currentPet.age}</p>
          <p><span className="text-gray-800">📍 Location:</span> {currentPet.location}</p>
          <p><span className="text-gray-800">👤 Owner:</span> {currentPet.ownerName || currentPet.owner}</p>
        </div>

        {showAdoptionLink && (
          <p className="mt-4 text-center">
            <a
              href={currentPet.adoptionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              🐶 View Adoption Page
            </a>
          </p>
        )}

        <div className="flex justify-between mt-6 gap-3">
          <button
            onClick={() => saveForLater(currentPet)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            💾 Save
          </button>
          <button
            onClick={() => setShowAdoptionLink(true)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            🐾 Adopt
          </button>
          <button
            onClick={nextPet}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
}
