import React from 'react'
import PetCard from './PetCard';


function ListPet({ pets, petAdopt, petDelete, petEdit, isAdmin }) {
    return (
        <div className="list">
            {pets.map(pet => (
                <PetCard
                    key={pet._id}
                    pet={pet}
                    petAdopt={petAdopt}
                    petEdit={petEdit}
                    petDelete={petDelete}
                    isAdmin={isAdmin}
                />
            ))}
        </div>
    );
}

export default ListPet;
