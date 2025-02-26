import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import '../../styles/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                name,
                email,
                password,
            });
            if (response.status === 200) {
                navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setErrors({ ...errors, email: 'Email already registered' });
                setTimeout(() => {
                    navigate('/login', { state: { message: 'User already exists. Please login.' } });
                }, 3000);
            } else {
                setErrors({ ...errors, general: error.response?.data?.message || 'Registration failed' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register">
            <Link to="/" className="home-icon">
                <FaHome />
            </Link>
            <div className="register-container">
                <h2>Create an Account</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    {errors.general && <div className="error-message">{errors.general}</div>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Registering...
                            </>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
