'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import UserContext from '@/context/userContext';
import Loader from '@/components/Loader';

export default function PetTinder() {
  const { user } = useContext(UserContext);
  const actualUser = user?.user;
  const userid = actualUser?._id;

  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdoptionLink, setShowAdoptionLink] = useState(false);
  const [fade, setFade] = useState(true);
  const [message, setMessage] = useState('');

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
        userid: userid,
      });
      setMessage('Pet saved for later!');
    } catch (error) {
      console.error('Error saving pet:', error);
      setMessage('Failed to save pet.');
    } finally {
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
  if (!currentPet) return <Loader />;

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 bg-gradient-to-br from-amber-50 to-emerald-100">
      {message && (
        <div className="mb-5 px-6 py-2 rounded-xl text-sm font-medium shadow transition-all duration-300 text-white bg-emerald-500">
          {message}
        </div>
      )}

      <div
        className={`w-full max-w-md bg-[#fffdf7] rounded-3xl shadow-lg border border-gray-200 p-6 transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-center text-3xl font-semibold text-gray-500 mb-5 tracking-wide">
          {currentPet.petName || currentPet.petname}
        </h2>

        <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-5 shadow-inner border border-gray-100">
          <Image
            src={currentPet.imageUrl}
            alt={currentPet.petName || currentPet.petname}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3 text-sm text-gray-800 leading-relaxed px-1">
          <p>
            <span className="font-medium text-gray-600">Posted:</span>{' '}
            {currentPet.postedOn}
          </p>
          <p>
            <span className="font-medium text-gray-600">Gender:</span>{' '}
            {currentPet.gender}
          </p>
          <p>
            <span className="font-medium text-gray-600">Age:</span>{' '}
            {currentPet.age}
          </p>
          <p>
            <span className="font-medium text-gray-600">Location:</span>{' '}
            {currentPet.location}
          </p>
          <p>
            <span className="font-medium text-gray-600">Owner:</span>{' '}
            {currentPet.ownerName || currentPet.owner}
          </p>
        </div>

        {showAdoptionLink && (
          <p className="mt-5 text-center">
            <a
              href={currentPet.adoptionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline font-semibold"
            >
              View Full Adoption Page
            </a>
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => saveForLater(currentPet)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium shadow-md transition"
          >
            Save
          </button>
          <button
            onClick={() => setShowAdoptionLink(true)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl font-medium shadow-md transition"
          >
            Adopt
          </button>
          <button
            onClick={nextPet}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-xl font-medium shadow-md transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
