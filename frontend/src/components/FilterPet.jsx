import { useState } from 'react';

import { fetchAllPets, filterPetByMood } from '../services/petService'

export default function FilterPet({setPets,setError}) {

    const [selectedMood, setSelectedMood] = useState('');
    
    const handleMoodChange = async (e) => {
        const mood = e.target.value;
        setSelectedMood(mood)
        setError(null); 
        try{
            let filteredPets = [];
            if(mood===''){
                filteredPets = await fetchAllPets();
              
            }else{
                filteredPets =await filterPetByMood(mood);
                if (filteredPets.length === 0) {
                    setError("No pets found for this mood");
                }
            }

            setPets(filteredPets)
        }catch(err){
            setError("Can not fetch pets by mood");
            setPets([]); 
        }
    }
    return (
        <div className='filter-pet'>
            <label>Filter by Mood </label>
            <select value={selectedMood} onChange={handleMoodChange} className='filter-item'>
                <option value="">All</option>
                <option value="Happy">Happy</option>
                <option value="Excited">Excited</option>
                <option value="Sad">Sad</option>
            
            </select>
        </div>
    )
}