import axiosInstance from '../utils/axiosInstance';

export const addPet = async (petForm) => {
    const response = await axiosInstance.post("/pets/add-pet", {
        ...petForm,
        age: Number(petForm.age)
    });

    return response.data;
};

export const fetchAllPets = async () => {
    const response = await axiosInstance.get('/pets/get-all-pets');
    return response.data;
};

export const deletePet = async (id) => {
    const response = await axiosInstance.delete(`/pets/delete-pet/${id}`);
    return response.data;
};

export const updatePetById = async (id, data) => {
    const response = await axiosInstance.put(`/pets/update-pet/${id}`, data);
    return response.data;
};

export const fetchPetById = async (id) => {
    const response = await axiosInstance.get(`/pets/get-a-pet/${id}`);
    return response.data;
};

export const filterPetByMood = async (mood) => {
    try {
        const response = await fetch(`http://localhost:8000/petshop/pets/filter?mood=${mood}`);
        if (!response.ok) {
            throw new Error('No pets found for this mood');
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch pets by mood");
    }
};

export const adoptPet = async (id) => {
    try {
        const response = await axiosInstance.put(`/pets/adopt/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};