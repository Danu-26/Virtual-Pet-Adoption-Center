import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import loginLogo from "../assets/logo/login-logo.png"
import {Link,useNavigate} from 'react-router-dom'


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext)
    const [error, setError] = useState("")
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        if (!email || !password) {
            setError("Both email and password are required.");
            setTimeout(() => setError(""), 4000); 
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/petshop/auth/login', {
                email, password,
            })
            const { user, token } = response.data;
            setError("");
            login(user, token)
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }



        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            setTimeout(() => setError(""), 4000);

        }
    }

    return (

        <form onSubmit={handleLogin} className="common-form">
            <h1>Welcome to Pet Adoption Center</h1>
            <img src={loginLogo} alt="user profile" />

            {error && <p className="error-message">{error}</p>}


            <input className="input-item" type="email" name="email" value={email} placeholder="Enter your Email Id"  onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="input-item" name="password" value={password} placeholder="Enter your Password"  onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" type="submit">Login</button>

            <p>Do not have an account ? <Link to="/register"className="link-btn">Create Account</Link></p>
        </form>

    );


}

export default LoginPage