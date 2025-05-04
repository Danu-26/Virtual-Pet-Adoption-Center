import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav>
            <div className="nav-left">
            
                <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {user && user.role !== "admin" && <Link className='nav-items' to="/">Home</Link>}
                    {user?.role === "admin" && (
                        <>
                            <Link to="/admin" className='nav-items'>Dashboard</Link>
                            <Link to="/admin/add-pet" className='nav-items'>Add Pet</Link>
                            <Link to="/admin/add-admin" className='nav-items'>Create Admin</Link>
                        </>
                    )}
                    {user && (
                        <button onClick={handleLogout} className='nav-logout nav-items'>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
