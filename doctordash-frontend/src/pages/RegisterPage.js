import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Link, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        const newErrors = {...errors}; // Copy the existing errors
        switch (name) {
            case 'firstName':
                newErrors.firstName = value ? "" : "This field is required";
                break;
            case 'lastName':
                newErrors.lastName = value ? "" : "This field is required";
                break;
            case 'email':
                newErrors.email = value ? (/\S+@\S+\.\S+/.test(value) ? "" : "Email is not valid") : "This field is required";
                break;
            case 'password':
                newErrors.password = value.length >= 8 ? "" : "Password must be at least 8 characters long";
                break;
            case 'confirmPassword':
                newErrors.confirmPassword = (value === formData.password) ? "" : "Passwords do not match";
                break;
            case 'role':
                newErrors.role = value ? "" : "This field is required";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        let errors = {};
        errors.firstName = formData.firstName ? "" : "This field is required";
        errors.lastName = formData.lastName ? "" : "This field is required";
        errors.email = formData.email ? (/\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid") : "This field is required";
        errors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long";
        errors.confirmPassword = formData.confirmPassword === formData.password ? "" : "Passwords do not match";
        errors.role = formData.role ? "" : "This field is required";

        setErrors({
            ...errors
        });

        return Object.values(errors).every(x => x === "");
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

            const roleSpecificUrl = formData.role === 'Doctor' ? 'https://localhost:7038/api/doctor' : 'https://localhost:7038/api/patient';
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
        <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
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
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleInputChange}
                    sx={{ textAlign: 'left', '.MuiSelect-select': { textAlign: 'left' } }}
                >
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Patient">Patient</MenuItem>
                </Select>
                <FormHelperText style={{color: 'red'}}>{errors.role}</FormHelperText>
            </FormControl>
            {registerError && <Typography color="error">{registerError}</Typography>}
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                Register
            </Button>
            <div style={{ marginTop: 8 }}>
                Already have an account? <Link href="/login">Login</Link>
            </div>
        </div>
    );
}

export default RegisterPage;