// src/components/Header/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header">
            <div className="outer-container">
                <div className="logo-brand-container">
                    <Link to="/" className="tab logo">Home</Link>
                </div>
                <nav className="navbar-container">
                    <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                        <div className="bar">naskdnask</div>
                        <div className="bar">sdadsa</div>
                        <div className="bar">adsd</div>
                    </div>
                    <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/translatorapp" className="tab" onClick={toggleMobileMenu}>App</Link>
                        <Link to="/team" className="tab" onClick={toggleMobileMenu}>Team</Link>
                        <Link to="/history" className="tab" onClick={toggleMobileMenu}>Translation History</Link>
                        {user ? (
                            <>
                                <p className="welcome-message">Welcome, {user}</p>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="tab" onClick={toggleMobileMenu}>Login</Link>
                                <Link to="/register" className="tab" onClick={toggleMobileMenu}>Register</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;