import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Logo from '../assets/doctordash-high-resolution-logo.png';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        const newErrors = { ...errors };
        if (name === 'password' || name === 'confirmPassword') {
            newErrors.confirmPassword =
                name === 'password' && formData.confirmPassword !== value
                    ? 'Passwords do not match'
                    : formData.password === formData.confirmPassword
                    ? ''
                    : 'Passwords do not match';
        }
        setErrors(newErrors);
    };

    const validateForm = () => {
        const validationErrors = {
            firstName: formData.firstName ? '' : 'This field is required',
            lastName: formData.lastName ? '' : 'This field is required',
            email: formData.email
                ? /\S+@\S+\.\S+/.test(formData.email)
                    ? ''
                    : 'Email is not valid'
                : 'This field is required',
            password: formData.password.length >= 8 ? '' : 'Password must be at least 8 characters long',
            confirmPassword:
                formData.confirmPassword === formData.password ? '' : 'Passwords do not match',
            role: formData.role ? '' : 'This field is required',
        };

        setErrors(validationErrors);
        return Object.values(validationErrors).every((x) => x === '');
    };

    const handleRegister = async (event) => {
        const createUserUrl = 'https://localhost:7038/api/user';
        event.preventDefault();
        setRegisterError('');
        if (validateForm()) {
            try {
                const createUserResponse = await fetch(createUserUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                if (!createUserResponse.ok) {
                    const errorResponse = await createUserResponse.json();
                    setRegisterError(errorResponse.message || "Failed to create user");
                    return;
                }
            const userData = await createUserResponse.json();
            const roleSpecificUrl = formData.role === 'Doctor' ? 'http://localhost:5249/api/doctor' : 'http://localhost:5249/api/patient';
            const roleSpecificBody = formData.role === 'Doctor' 
                ? JSON.stringify({
                    doctorId: userData.id,
                    specialization: "",
                    qualifications: "",
                    bio: ""
                }) : JSON.stringify({
                    patientId: userData.id,
                    address: "",
                    medical_history: ""
                });
            const roleSpecificResponse = await fetch(roleSpecificUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: roleSpecificBody
            });
            if (!roleSpecificResponse.ok) {
                const errorResponse = await roleSpecificResponse.json();
                setRegisterError(errorResponse.message || `Failed to create ${formData.role}`);
                return;
            }
    
                navigate('/login');
            } catch (error) {
                console.error("Error during registration:", error);
                setRegisterError("Network error: Unable to connect.");
            }
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #f0f4ff, #dfe9fc)',
            }}
        >
            <div
                style={{
                    padding: 20,
                    maxWidth: 400,
                    width: '100%',
                    background: '#fff',
                    borderRadius: 10,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img src={Logo} alt="DoctorDash Logo" style={{ maxWidth: '150px', marginBottom: 10 }} />
                </div>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
                </Typography>
                <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color={isPasswordFocused ? 'primary' : 'disabled'} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color={isConfirmPasswordFocused ? 'primary' : 'disabled'} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        label="Role"
                    >
                        <MenuItem value="Doctor">Doctor</MenuItem>
                        <MenuItem value="Patient">Patient</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: 'red' }}>{errors.role}</FormHelperText>
                </FormControl>
                {registerError && <Typography color="error">{registerError}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                    style={{
                        padding: '10px 0',
                        marginTop: 16,
                        backgroundColor: '#6a11cb',
                        color: '#fff',
                    }}
                >
                    Register
                </Button>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    Already have an account? <Link href="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;