import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../../styles/ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/users/forgot-password', { email });
            if(response.status === 200){
                navigate('/reset-password', { 
                    state: { email: email }
                });
            } else {
                setMessage("User doesn't exist!")
                navigate("/register")
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-password">
            <Link to="/" className="home-icon">
                <FaHome />
            </Link>
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="login-link">
                    Remember your password? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
