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
  const [userid, setUserid] = useState("68593f3167b085ac6e2b66be");

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
      <h1 className="text-4xl font-bold mb-4 text-gray-800">PAWS&CLAWS</h1>

      {message && (
        <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 shadow">
          {message}
        </div>
      )}

      <div
        className={`w-96 p-6 bg-white rounded-lg shadow-xl transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          {currentPet.petName || currentPet.petname}
        </h2>
        <div className="relative w-full h-72 mb-4 rounded-lg overflow-hidden">
          <Image
            src={currentPet.imageUrl}
            alt={currentPet.petName || currentPet.petname}
            fill
            style={{ objectFit: 'cover' }}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-left text-gray-600 space-y-2">
          <p>
            <span className="font-medium">Posted On:</span> {currentPet.postedOn}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {currentPet.gender}
          </p>
          <p>
            <span className="font-medium">Age:</span> {currentPet.age}
          </p>
          <p>
            <span className="font-medium">Location:</span> {currentPet.location}
          </p>
          <p>
            <span className="font-medium">Owner:</span> {currentPet.ownerName || currentPet.owner}
          </p>
        </div>

        {showAdoptionLink && (
          <p className="mt-4 text-blue-500 text-center">
            <a
              href={currentPet.adoptionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700"
            >
              Adopt this pet
            </a>
          </p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => saveForLater(currentPet)}
            className="flex-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors duration-300"
          >
            Save for Later
          </button>
          <button
            onClick={() => setShowAdoptionLink(true)}
            className="flex-1 mx-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors duration-300"
          >
            Adopt
          </button>
          <button
            onClick={nextPet}
            className="flex-1 ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

