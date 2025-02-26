import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../../styles/ForgotPassword.css';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter";
        }
        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter";
        }
        if (!hasNumbers) {
            return "Password must contain at least one number";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/reset-password', {
                email,
                password
            });

            if (response.status === 200) {
                navigate('/login', { 
                    state: { message: 'Password reset successful. Please login with your new password.' }
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="forgot-password">
                <div className="forgot-password-container">
                    <h2>Invalid Access</h2>
                    <p>Please start from the forgot password page.</p>
                    <Link to="/forgot-password" className="login-link">Go to Forgot Password</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="forgot-password">
            <Link to="/" className="home-icon">
                <FaHome />
            </Link>
            <div className="forgot-password-container">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="message">{error}</p>}
                    <div className="password-requirements">
                        <p>Password must contain:</p>
                        <ul>
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One lowercase letter</li>
                            <li>One number</li>
                            <li>One special character</li>
                        </ul>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
