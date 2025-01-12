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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const roleUrl = `https://localhost:7038/api/${role}/${userId}`;
    const roleResponse = await fetch(roleUrl);
    const roleData = await roleResponse.json();

    const userUrl = `https://localhost:7038/api/user/${userId}`;
    const userResponse = await fetch(userUrl);
    const userData = await userResponse.json();

    setProfileData({
        firstName: userData.firstname,
        lastName: userData.lastname,
        email: userData.email,
        specialization: roleData.specialization,
        qualifications: roleData.qualifications,
        bio: roleData.bio,
        address: roleData.address,
        medicalHistory: roleData.medical_History
    });
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

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const apiUrl = `https://localhost:7038/api/${role}/${userId}`;
    let updateData;

    if (role === 'doctor') {
        updateData = {
            doctorId: userId,
            specialization: profileData.specialization,
            qualifications: profileData.qualifications,
            bio: profileData.bio
        };
    } else if (role === 'patient') {
        updateData = {
            patientId: userId,
            address: profileData.address,
            medical_History: profileData.medicalHistory
        };
    }

    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
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
        disabled={true}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="lastName"
        value={profileData.lastName}
        onChange={handleChange}
        disabled={true}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={profileData.email}
        onChange={handleChange}
        disabled={true}
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