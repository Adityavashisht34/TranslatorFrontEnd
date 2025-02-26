import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            // Clear the message from location state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post('http://localhost:8080/api/users/email', {
                email,
                password,
            });

            if (response.status === 200 && response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('userId', response.data.userId);
                navigate('/'); // Redirect to the root path (LetsTranslate component)
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setErrors({ password: 'Invalid password!' });
            } else if (error.response?.status === 404) {
                setErrors({ email: 'User not found!' });
            } else {
                setErrors({ general: 'Login failed. Try again later.' });
            }
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <Link to="/" className="home-icon">
                <FaHome />
            </Link>
            <div className="login-container">
                <div className="login-card">
                    <h2>Login</h2>
                    {message && <p className="message">{message}</p>}
                    <form className="login-form" onSubmit={handleLogin}>
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
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                    <div className="signup-link">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                        <p>Forgot your password? <Link to="/forgot-password">Reset it here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
