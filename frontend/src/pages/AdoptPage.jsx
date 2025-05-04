import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adoptPet, fetchPetById } from '../services/petService';
import { AuthContext } from '../auth/AuthContext';
import AdoptedPdf  from '../components/AdoptedPdf';

function AdoptPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { user } = useContext(AuthContext);

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
    console.log(id)
    useEffect(() => {
        const adoptAndFetchPet = async () => {
            try {
                await adoptPet(id); 
                const petData = await fetchPetById(id); 
                setPet(petData);
                setSuccess("You successfully adop a pet!");
            } catch (err) {
                setError(err.response?.data?.message || "Adoption process failed");
            }
        };

        adoptAndFetchPet();
    }, [id]);

    return (
        <div className="adopt-page">
            <h2>Adoption Confirmation</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {pet && (
                <div className="pet-details">
                    <p><strong>Name:</strong> {pet.name}</p>
                    <p><strong>Species:</strong> {pet.species}</p>
                    <p><strong>Age:</strong> {pet.age}</p>
                    <p><strong>Personality:</strong> {pet.personality}</p>
                    <p><strong>Adopted Date:</strong> {pet.adoption_date}</p>
                    <p><strong>Adopted By:</strong> {user?.name}</p>
                    <div className='adop-page-btn'>
                        <AdoptedPdf pet={pet} />
                        <button className="btn-light" onClick={() => navigate('/')}>Back to Home</button>
                    </div>
             
                </div>
            )}
        </div>
    );
}

export default AdoptPage;
