'use client'

import { useContext, useEffect, useState } from 'react'
import UserContext from '@/context/userContext'
import axios from 'axios'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Trash2 } from 'lucide-react'

export default function SavedForLater() {
  const [savedPets, setSavedPets] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)
  const actualUser = user?.user
  const userId = actualUser?._id

  useEffect(() => {
    const fetchSavedPets = async () => {
      if (!userId) return
      try {
        const res = await axios.get(`/api/saveforlater?userId=${userId}`)
        setSavedPets(res.data)
      } catch (err) {
        console.error('Error fetching saved pets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedPets()
  }, [userId])

  const deletePet = async (petId) => {
    try {
      await axios.post('/api/delete', { userid: userId, petId })
      setSavedPets((prev) => prev.filter((pet) => pet._id !== petId))
    } catch (err) {
      console.error('Error deleting saved pet:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading saved pets...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow px-4 md:px-10 pt-24 pb-10 max-w-5xl mx-auto w-full">

        {savedPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <h1 className="text-2xl font-bold text-center text-emerald-700 mb-4">No Saved Pets</h1>
            <div className="w-64 h-64">
              <DotLottieReact
                src="https://lottie.host/b2205db2-ff85-41eb-bf90-0929398db84f/uvYRXlDJiy.lottie"
                loop
                autoplay
              />
            </div>
            <p className="text-gray-500 text-sm text-center">
              No saved pets yet. Go save some furry friends!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-emerald-700 mb-8">
              Your Saved Pets
            </h1>

            {savedPets.map((pet) => (
              <div
                key={pet._id}
                className="flex bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition group overflow-hidden"
              >
                {/* Image */}
                <div className="w-36 sm:w-44 h-36 sm:h-44 bg-gray-100 flex-shrink-0">
                  <img
                    src={pet.imageUrl}
                    alt={pet.petName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between text-sm w-full">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800 mb-1">
                      {pet.petName}
                    </h2>
                    <p className="text-gray-600">Gender: <span className="font-medium">{pet.gender}</span></p>
                    <p className="text-gray-600">Age: <span className="font-medium">{pet.age}</span></p>
                    <p className="text-gray-600">Location: <span className="font-medium">{pet.location}</span></p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <a
                      href={pet.adoptionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-medium text-sm hover:underline"
                    >
                      View Adoption Page
                    </a>

                    {/* Animated Delete Button */}
                    <button
                      onClick={() => deletePet(pet._id)}
                      className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-transform hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-black text-gray-400 text-xs text-center py-4 border-t border-gray-800 mt-auto">
        © {new Date().getFullYear()} Paws&Claws. All rights reserved.
      </footer>
    </main>
  )
}

