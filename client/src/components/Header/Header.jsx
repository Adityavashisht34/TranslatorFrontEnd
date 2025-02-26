// src/components/Header/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Header.css'; // Ensure to import the CSS file

function Header() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user'); // Retrieve user information from local storage

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId'); // Also remove userId
        navigate('/'); // Redirect to home
    };

    return (
        <header className="header">
            <nav className="navbar-container">
                <Link to="/" className="tab">Home</Link>
                <Link to="/translatorapp" className="tab">Translator App</Link>
                <Link to="/team" className="tab">Meet Our Team</Link>
                <Link to="/history" className="tab">Translation History</Link>
                {user ? (
                    <>
                        <p className="welcome-message">Welcome, {user}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="tab">Login</Link>
                        <Link to="/register" className="tab">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
