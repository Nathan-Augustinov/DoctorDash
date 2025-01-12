import React, { useState } from 'react';
import { Paper, Grid2, TextField, Button, Typography, Box } from '@mui/material';

const SearchTab = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

const fetchResults = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  };

  const handleSearch = async () => {
    setError('');
    setResults([]);
    if (searchTerm.length < 3) {
      setError('Please enter at least 3 characters.');
      return;
    }
    const searchedRole = role === 'doctor' ? 'patient' : 'doctor';
    const nameUrl = `https://localhost:7038/api/user/search?query=${encodeURIComponent(searchTerm)}&role=${searchedRole}`;
    const nameResults = await fetchResults(nameUrl);
    setResults(nameResults);

    if (role === 'patient') {
      const specUrl = `https://localhost:7038/api/doctor/searchBySpecialization?specialization=${encodeURIComponent(searchTerm)}`;
      const specializationResults = await fetchResults(specUrl);
      setResults(prev => [...prev, ...specializationResults]);
    }
    if (results.length === 0) {
        setError("No results were found!");
    }
  };

  const handleMakeAppointment = (doctorId) => {
    console.log("Making an appointment with doctor ID:", doctorId);
    // Later add functionality to navigate to appointment making page or modal
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">{role === 'doctor' ? 'Search Patients' : 'Search Doctors'}</Typography>
      <TextField
        fullWidth
        label={role === 'doctor' ? 'Search by patient name' : 'Search by doctor name or specialization'}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      <Box sx={{ mt: 2 }}>
        {results.map((doctor) => (
            <Paper key={doctor.userId} elevation={2} sx={{ margin: 2, padding: 2 }}>
            <Grid2 container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid2 item xs={8}>
                <Typography variant="subtitle1">{doctor.fullName}</Typography>
                </Grid2>
                <Grid2 item xs={4}>
                <Button variant="contained" color="primary" onClick={() => handleMakeAppointment(doctor.userId)}>
                    Make Appointment
                </Button>
                </Grid2>
            </Grid2>
            </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SearchTab;