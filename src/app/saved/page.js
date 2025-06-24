'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SavedForLater() {
  const [savedPets, setSavedPets] = useState([])
  const [loading, setLoading] = useState(true)

  // Hardcoded user ID — replace this with JWT-based user later
  const userId = '685a51ac0426d2bb60d85009'

  useEffect(() => {
    const fetchSavedPets = async () => {
      try {
        const response = await axios.get(`/api/saveforlater?userId=${userId}`)
        setSavedPets(response.data)
      } catch (error) {
        console.error('Error fetching saved pets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedPets()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved for Later</h1>
      {savedPets.length === 0 ? (
        <p className="text-gray-600">No pets saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPets.map((pet) => (
            <div key={pet._id} className="border rounded-xl shadow p-4">
              <img
                src={pet.imageUrl}
                alt={pet.petName}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{pet.petName}</h2>
              <p className="text-gray-600">Breed: {pet.gender}</p>
              <p className="text-gray-600">Location: {pet.location}</p>
              <p className="text-gray-600">Age: {pet.age}</p>
              <a
                href={pet.adoptionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 block"
              >
                Adopt
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
