import React, { useState, useEffect } from 'react';
import {addPet} from '../services/petService';



function AddPet() {
    const [petForm, setPetForm] = useState({ name: '', species: '', age: 0, personality: '' });
    const personalityTypes = ['Friendly', 'Shy', 'Playful', 'Aggressive','Calm']
    const [error,setError]=useState("")
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange=(e)=>{
        setPetForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
  
    const validatePet=()=>{
        if (!petForm.name.trim()) return "Name is required.";
        if (!petForm.species.trim()) return "species is required.";
        if (!petForm.age.toString().trim()) return "Age is required.";
        if (!petForm.personality.trim()) return "Personality is required.";
    }




    const handleAddPet=async(e)=>{
        e.preventDefault(); 
        const validatePetForm = validatePet();
        if (validatePetForm){
            setError(validatePetForm);
            return;
        }


        try{
            const data = await addPet(petForm)
            // console.log(data)

            setSuccess(data.message);
            setError("");
            setPetForm({ name: "", species: "", age: "", personality: "" });
      

        }catch(err){
            // console.log(err);
            setSuccess("");
            setError(err.response?.data?.message || "Creating pet profile failed");
        }

    }


  return (

      <form className='common-form' onSubmit={handleAddPet}>
           <h1>Create Pet Profile </h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input name="name" className="input-item" value={petForm.name} placeholder='Enter pet name' onChange={handleChange} />
          <input name="species" className="input-item"  value={petForm.species} placeholder='Enter specie  ' onChange={handleChange} />
          <input name="age" className="input-item" type="number"  value={petForm.age} placeholder='Enter pet age' onChange={handleChange}  />
          <select name="personality" className="input-item"  value={petForm.personality} onChange={handleChange} >
              <option value="">Select Personality</option>
              {personalityTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
              ))}
          </select>
          <button className="btn" type="submit">Create </button>
    </form>
  )
}

export default AddPet
