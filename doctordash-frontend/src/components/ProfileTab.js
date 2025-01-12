import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const ProfileTab = ({ role }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialization: '',
    qualifications: '',
    bio: '',
    address: '',
    medicalHistory: ''
  });
  //get the user Id
  const userId = "";

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    // Replace URL with your actual API endpoint
    const response = await fetch(`https://localhost:7038/api/${role}/${userId}`);
    const data = await response.json();
    setProfileData(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement update logic to POST changes to backend
    console.log(profileData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 1 }}>
      <Typography variant="h6">Profile Details</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="firstName"
        value={profileData.firstName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="lastName"
        value={profileData.lastName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={profileData.email}
        onChange={handleChange}
        InputProps={{
          readOnly: true,
        }}
      />
      {role === 'doctor' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="Specialization"
            name="specialization"
            value={profileData.specialization}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Qualifications"
            name="qualifications"
            value={profileData.qualifications}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </>
      )}
      {role === 'patient' && (
        <>
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Medical History"
            name="medicalHistory"
            value={profileData.medicalHistory}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </>
      )}
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileTab;