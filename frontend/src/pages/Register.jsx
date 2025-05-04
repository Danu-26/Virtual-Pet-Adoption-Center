import React,{useState} from 'react'
import axiosInstance from "../utils/axiosInstance";
import loginLogo from "../assets/logo/login-logo.png"
import { useNavigate } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate=useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            const response = await axiosInstance.post("http://localhost:8000/petshop/auth/register", formData);
            // console.log(response.data)
        
            setSuccess(response.data.message);
            setError(""); 
            setFormData({ name: "", email: "", password: "" });
            setTimeout(() => navigate('/login'), 1500);
        

        } catch (err) {
            setSuccess(""); 
            setError(err.response?.data?.message || "Register failed");
        }



    }


    return (

        <form onSubmit={handleRegister} className="common-form">
            <h1>Welcome to Pet Adoption Center</h1>
            <img src={loginLogo} alt="user profile" />

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <input className="input-item" name="name" type="text" value={formData.name} placeholder="Enter your Name"  onChange={handleChange} />
            <input className="input-item" name="email" type="email" value={formData.email} placeholder="Enter your Email Id"  onChange={handleChange} />
            <input type="password" className="input-item" name="password" value={formData.password} placeholder="Enter your Password"  onChange={handleChange} />
            <button className="btn" type="submit">Register</button>
        </form>

    )
}

export default Register;
