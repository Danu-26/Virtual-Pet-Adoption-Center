import React, { useState, useEffect } from 'react'
import axiosInstance from "../utils/axiosInstance";


function CreateAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);


 

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required.";
        if (!formData.email.trim()) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid.";
        if (!formData.password.trim()) return "Password is required.";
        if (formData.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
     

        const validateError = validateForm();

        if (validateError){
            setError(validateError);
            return;
        }
        

        try {
            const response = await axiosInstance.post("/admin/create-admin", formData);
            console.log(response)
        
            setSuccess(response.data.message);
            setError(""); 
            setFormData({ name: "", email: "", password: "" });
      
        

        } catch (err) {
            console.log(err)
            setSuccess(""); 
            setError(err.response?.data?.message || "creating admin user failed");
        }



    }

  return (
   <form onSubmit={handleRegister} className="common-form">
            <h1>Create Admin</h1>
        
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
     
            <input className="input-item" name="name" type="text" value={formData.name} placeholder="Enter your Name"  onChange={handleChange} />
            <input className="input-item" name="email" type="email" value={formData.email} placeholder="Enter your Email Id"  onChange={handleChange} />
            <input type="password" className="input-item" name="password" value={formData.password} placeholder="Enter your Password"  onChange={handleChange} />
            <button className="btn" type="submit">Register</button>
      
        </form>
  )
}

export default CreateAdmin
