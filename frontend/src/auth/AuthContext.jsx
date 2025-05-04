import { createContext,useState,useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        setLoading(false); 
    }, [])

    const login = (user, token) => {
        setUser(user)
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    }

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
   
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}