'use client';

import { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/userContext';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function SavedForLater() {
  const [savedPets, setSavedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const actualUser = user?.user;
  const userId = actualUser?._id;

  useEffect(() => {
    const fetchSavedPets = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/saveforlater?userId=${userId}`);
        setSavedPets(response.data);
      } catch (error) {
        console.error('Error fetching saved pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPets();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading saved pets...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow px-4 md:px-10 pt-24 pb-10 max-w-5xl mx-auto w-full">
        

        {savedPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <h1 className="text-2xl font-bold text-center text-emerald-700 mb-8">No Saved Pets</h1>
            <div className="w-60 h-60">
              <DotLottieReact
                src="https://lottie.host/b2205db2-ff85-41eb-bf90-0929398db84f/uvYRXlDJiy.lottie"
                loop
                autoplay
              />
            </div>
            <p className="text-gray-500 text-sm text-center">No saved pets yet. Go save some furry friends 🐾</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-emerald-700 mb-8">Your Saved Pets</h1>
            {savedPets.map((pet) => (
              <div
                key={pet._id}
                className="flex bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="w-32 sm:w-40 h-32 sm:h-40 bg-gray-100 flex-shrink-0">
                  <img
                    src={pet.imageUrl}
                    alt={pet.petName}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between text-sm w-full">
                  <div>
                    <h2 className="text-lg font-semibold text-emerald-700">
                      {pet.petName}
                    </h2>
                    <p className="text-gray-600">Gender: {pet.gender}</p>
                    <p className="text-gray-600">Age: {pet.age}</p>
                    <p className="text-gray-600">Location: {pet.location}</p>
                  </div>
                  <div>
                    <a
                      href={pet.adoptionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 mt-2 inline-block font-medium hover:underline"
                    >
                      View Adoption Page
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="bg-black text-gray-400 text-xs text-center py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Paws&Claws. All rights reserved.
      </footer>
    </main>
  );
}
