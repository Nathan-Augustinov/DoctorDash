import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginUrl = 'https://localhost:7038/api/user/login';
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log("Login successful:", data);
            navigate('/home'); // Redirect to home page on successful login
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
            </Button>
            <div style={{ marginTop: 8 }}>
                <Link href="#" onClick={() => alert("Redirect to forgot password")}>Forgot Password?</Link>
            </div>
            <div style={{ marginTop: 8 }}>
                Don't have an account? <Link href="/register">Register</Link>
            </div>
        </div>
    );
}

export default LoginPage;