import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../assets/doctordash-high-resolution-logo.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
    const navigate = useNavigate();

    const handleCapsLockDetection = (e) => {
        setIsCapsLock(e.getModifierState('CapsLock'));
    };

    const handlePasswordFocus = () => {
        window.addEventListener('keydown', handleCapsLockDetection);
        window.addEventListener('keyup', handleCapsLockDetection);
    };

    const handlePasswordBlur = () => {
        window.removeEventListener('keydown', handleCapsLockDetection);
        window.removeEventListener('keyup', handleCapsLockDetection);
        setIsCapsLock(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async () => {
        const loginUrl = 'https://localhost:7038/api/user/login';
        setError('');
        setLoading(true);
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Login failed');
                return;
            }

            const userData = await response.json();

            if (userData.role === "Doctor") {
                navigate('/doctor-home'); 
            } else if (userData.role === "Patient") {
                navigate('/patient-home'); 
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('sessionExpiry', Date.now() + (1000 * 60 * 60));
            localStorage.setItem('role', userData.role);
            localStorage.setItem('userId', userData.id);
        } catch (error) {      
            setError("Network error: Unable to connect.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            }}
        >
            <div style={{ padding: 20, maxWidth: 400, width: '100%', background: 'white', borderRadius: 8, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <img 
                        src={Logo} 
                        alt="DoctorDash Logo" 
                        style={{ width: '150px', height: 'auto' }} 
                    />
                </div>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'} // Toggles between text and password
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {isCapsLock ? <LockIcon color="#6a11cb" /> : <LockOpenIcon />}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        padding: '10px 0',
                        marginTop: 16,
                        backgroundColor: '#6a11cb',
                        color: '#fff',
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Link 
                        href="#" 
                        onClick={() => alert("Redirect to forgot password")} 
                        style={{ textDecoration: 'none', color: '#2575fc', fontWeight: 'bold' }}
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/register" style={{ textDecoration: 'none', color: '#6a11cb', fontWeight: 'bold' }}>
                            Register
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;