import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPetById } from '../services/petService'

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await fetchPetById(id);
        setPet(data);
      } catch (err) {
        setError('Failed to load pet details');
        console.log(err);
      }
    };
    fetchPet();
  }, [id])


  if (error) {
    return <p className='error-message'>{error}</p>
  }

  if (!pet) return <p className='success-message'>Loading...</p>;
  return (
    <div className='center-wrapper '>
    <div className='pet-details-card'>
      <h2>{pet.name}</h2>
      <h4><span>Id: </span>{pet._id}</h4>
      <p><span>Species: </span>{pet.species}</p>
      <p><span>Age: </span>{pet.age}</p>
      <p><span>Personality: </span>{pet.personality}</p>
      <p><span>Status: </span>{pet.adopted ? 'Adopted' : 'Available'}</p>
      <p><span>Mood: </span>{pet.mood}</p>
    </div>
    </div>
  )
}

export default PetDetails
