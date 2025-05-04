import React, { useEffect, useState, useContext } from 'react'
import ListPet from '../components/ListPet';
import { AuthContext } from '../auth/AuthContext';
import { fetchAllPets, deletePet, updatePetById, adoptPet } from '../services/petService'
import FilterPet from '../components/FilterPet';

import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [pets, setPets] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

const navigate=useNavigate();
  const [editPet, setEditPet] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const isAdmin = user?.role === 'admin';

  useEffect(() => {

    const getAllPets = async () => {
      try {
        const data = await fetchAllPets()
        setPets(data)
      } catch (err) {
        setError("Failed to fetch pets");
      }
    }
    getAllPets();
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);



  const petAdopt = async (id) => {
    navigate(`/adopt/${id}`);
  }


  const petDelete = async (id) => {
    try {
      await deletePet(id);
      setPets(prev => prev.filter(pet => (pet._id !== id)))
    } catch (err) {
      setError(err.response?.data?.message || "deleting pet profile failed");
    }
  }


  const petEdit = (id) => {
    const petForEdit = pets.find(pet => pet._id === id)
    setEditPet(petForEdit);
    setShowModal(true);
  }


  const updatePet = async () => {
    try {
      const data = await updatePetById(editPet._id, editPet);


      setPets(prevPets =>
        prevPets.map(pet => pet._id === editPet._id ? data.pet : pet)
      );
      setShowModal(false);
      setEditPet(null);
      setSuccess(data.message);
      // console.log(response.data)

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update pet");
    }
  }


  const goHome = () => {
    setShowModal(false);
    setEditPet(null);
  }

  const handleChange = (e) => {
    setEditPet((prev) => ({
      ...prev, [e.target.name]: e.target.value
    })

    )
  }

  return (
    <div>
      {isAdmin ? <h1>Manage pets</h1> : <h1>All Pets</h1>}

      <FilterPet setPets={setPets} setError={setError} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {
        showModal && editPet && (
          <div className='cmodal-overlay'>
            <div className="modal-content">
              <h4>Edit Pet</h4>
              <div className='model-items'>
                <input name="name" className="input-item-edit" value={editPet.name} onChange={handleChange} />
                <input name="species" className="input-item-edit" value={editPet.species} onChange={handleChange} />
                <input name="age" className="input-item-edit" value={editPet.age} onChange={handleChange} />
                <select name="personality" className="input-item-edit" value={editPet.personality} onChange={handleChange}>
                  <option value="">Select Personality</option>
                  {['Friendly', 'Shy', 'Playful', 'Aggressive', 'Calm'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <button className="btn-update" onClick={updatePet}>Update</button>
                <button className="btn-light" onClick={goHome}>Back</button>
              </div>

            </div>
          </div>
        )
      }
      <ListPet pets={pets} petAdopt={petAdopt} petDelete={petDelete} isAdmin={isAdmin} petEdit={petEdit} />

    </div>
  )
}

export default HomePage
