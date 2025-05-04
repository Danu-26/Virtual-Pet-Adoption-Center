import React from 'react';
import { jsPDF } from 'jspdf';  
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

function AdoptedPdf({ pet }) {
    const { user } = useContext(AuthContext);

   
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text(`Pet Name: ${pet.name}`, 10, 10);
        doc.text(`Species: ${pet.species}`, 10, 20);
        doc.text(`Age: ${pet.age}`, 10, 30);
        doc.text(`Personality: ${pet.personality}`, 10, 40);
        doc.text(`Adopted By: ${user?.name || 'Unknown User'}`, 10, 50);  

      
        if (pet.adoptionDate) {
            doc.text(`Adoption Date: ${new Date(pet.adoptionDate).toLocaleDateString()}`, 10, 60);
        }

        doc.save(`${pet.name}_adopted_by_${user?.name || 'user'}.pdf`);
    };

    return (
        <button onClick={generatePDF} className="btn-pdf">
            Download Adoption Certificate
        </button>
    );
}

export default AdoptedPdf;
