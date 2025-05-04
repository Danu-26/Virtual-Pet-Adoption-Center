const Pet = require('../models/Pet');
const { calculateMood } = require('../utils/moodLogic');

const addPet = async (req, res) => {
    const { name, species, age, personality } = req.body;
 
    try {
        const pet = new Pet({
            name,
            species,
            age,
            personality,
            createdAt: new Date()  
        });

        await pet.save();
        res.status(201).json({
            message: "Pet profile added successfully",
            pet: {
                ...pet.toObject(),
                mood: calculateMood(pet.createdAt)
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getAllPet = async (req, res) => {
    try {
        const pets = await Pet.find();
        const petsWithMood = pets.map(pet => ({
            ...pet.toObject(),
            mood: calculateMood(pet.createdAt)
        }));
        res.json(petsWithMood);
    } catch (err) {
        res.status(500).json({ message: "No pets available" });
    }
};

const getOnePet = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        const petWithMood = {
            ...pet.toObject(),
            mood: calculateMood(pet.createdAt)
        };

        res.json(petWithMood);

    } catch (error) {
        res.status(500).json({ message: "Pet details not available" });
    }
}

const petUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, species, age, personality } = req.body;

    try {
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        pet.name = name;
        pet.species = species;
        pet.age = age;
        pet.personality = personality;

        await pet.save();

      
        const updatedPet = {
            ...pet.toObject(),
            mood: calculateMood(pet.createdAt)
        };

        res.status(200).json({ message: "Your pet updated successfully", pet: updatedPet });
    } catch (error) {
        res.status(500).json({ message: "Failed to update pet" });
    }
};


const petDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPet = await Pet.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error while deleting pet" });
    }

}


const petFilterByMood = async (req, res) => {
    const { mood } = req.query;
    try {
      
        const pets = await Pet.find();

 
        console.log('All pets:', pets);
        console.log('Filtering for mood:', mood);

        const filteredPets = pets
            .map(pet => ({
                ...pet.toObject(),
                mood: calculateMood(pet.createdAt)
            }))
            .filter(pet => pet.mood.toLowerCase() === mood.toLowerCase());

     
        // console.log('Filtered Pets:', filteredPets);

        if (!filteredPets.length) {
            return res.status(404).json({ message: "Pets not found for selected mood" });
        }

   
        res.json(filteredPets);

    } catch (err) {
        // console.error('Error while filtering pets:', err);
        res.status(500).json({ message: "Server error while filtering pets" });
    }
};

const petAdopt = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.adopted = true;
        pet.adoption_date = new Date(); 
        await pet.save();

        res.status(200).json({ message: "Pet adopted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Adoption failed" });
    }
};




module.exports = { addPet, getAllPet, getOnePet, petUpdate, petDelete, petFilterByMood, petAdopt };
