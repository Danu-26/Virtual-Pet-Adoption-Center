import React from 'react'
import { Link } from 'react-router-dom'


function PetCard({ pet, petAdopt, petDelete, petEdit, isAdmin }) {
  return (
    <div className="card">
      <h3>{pet.name}</h3>
      <p><span>Species:</span> {pet.species}</p>
      <p><span>Age: </span>{pet.age}</p>
      <p><span>Personality: </span>{pet.personality}</p>
      <p className={`font-semibold ${pet.mood === 'Happy' ? 'text-green-500' : 'text-red-500'}`}>
         <span> Mood: </span>{pet.mood}
      </p>
      <p><span>Status: </span>{pet.adopted ? 'Adopted' : 'Available'}</p>
      <Link to={`/pets/${pet._id}`} className="view-link-btn">View Details</Link>
      <div className="card-btn">
        {
          !pet.adopted && !isAdmin && (
            <button onClick={() => petAdopt(pet._id)} className="btn-light">Adopt</button>
          )}
        {isAdmin && (
          <>
            <button onClick={() => petEdit(pet._id)} className="btn-light">Edit</button>
          <button onClick={() => petDelete(pet._id)} className="btn-delete">Delete</button>
          </>
        )

        }
      </div>
    </div>
  )
}

export default PetCard
