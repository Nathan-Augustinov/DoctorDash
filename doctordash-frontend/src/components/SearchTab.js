import React, { useState } from 'react';
import { Paper, Grid2, TextField, Button, Typography, Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem } from '@mui/material';

const SearchTab = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedDoctorOrPatient, setSelectedDoctorOrPatient] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

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
  };

  const handleMakeAppointment = async (userId) => {
    setSelectedDoctorOrPatient(userId);
    if (role === 'Patient') {
      const response = await fetch(`https://localhost:7038/api/timeslot/getDoctorTimeslots?doctorId=${userId}`);
      if (response.ok) {
          const slots = await response.json();
          setTimeslots(slots);
          setAppointmentModalOpen(true);
      }
    } else {
      var doctorId = localStorage.getItem('userId');
      const response = await fetch(`https://localhost:7038/api/timeslot/getDoctorTimeslots?doctorId=${doctorId}`);
      if (response.ok) {
          const slots = await response.json();
          setTimeslots(slots);
          setAppointmentModalOpen(true);
      }
    }
    
  }

  const handleBookAppointment = async (timeslotId) => {
    console.log(timeslotId);
    var appointment = {};
    if (role === 'Patient') {
      appointment = {
        doctorId: selectedDoctorOrPatient,
        patientId: localStorage.getItem('userId'),
        date: timeslots.find(slot => slot.timeslotId === timeslotId).startTime, 
        status: 'Scheduled',
        notes: ''
      };
    } else {
      appointment = {
        doctorId: localStorage.getItem('userId'),
        patientId: selectedDoctorOrPatient,
        date: timeslots.find(slot => slot.timeslotId === timeslotId).startTime, 
        status: 'Scheduled',
        notes: ''
      };
    }
  
    const response = await fetch('https://localhost:7038/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
    });

    if (response.ok) {
        // alert("Appointment booked successfully!");
        // setAppointmentModalOpen(false);
      //   const updateTimeslotResponse = await fetch(`https://localhost:7038/api/timeslot/${timeslotId}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ isAvailable: false }) // Setting isAvailable to false
      // });

      // if (updateTimeslotResponse.ok) {
      //     alert("Appointment booked and timeslot updated successfully!");
      //     setAppointmentModalOpen(false);
      // } else {
      //     alert("Appointment booked but failed to update timeslot availability.");
      // }
        alert("Appointment booked and timeslot updated successfully!");
        setAppointmentModalOpen(false);
    } else {
        alert("Failed to book appointment.");
    }
  };

  const handleClickOpen = async (user) => {
    setSelectedUser(user);
    try {
      const detailUrl = `https://localhost:7038/api/${user.role.toLowerCase()}/${user.userId}`;
      const response = await fetch(detailUrl);
      if (response.ok) {
          const detailedData = await response.json();
          setSelectedUser(prev => ({
              ...prev,
              ...detailedData
          }));
      } else {
          console.error('Failed to fetch detailed data');
      }
    } catch (error) {
        console.error('Error fetching details:', error);
    }
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

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
        {results.length > 0 ? (
          results.map((user) => (
            <Paper key={user.userId} elevation={2} sx={{ margin: 2, padding: 2 }} onClick={() => handleClickOpen(user)}>
              <Grid2 container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid2 item xs={8}>
                  <Typography variant="subtitle1">{user.fullName}</Typography>
                </Grid2>
                <Grid2 item xs={4}>
                  <Button variant="contained" color="primary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMakeAppointment(user.userId);
                    }}
                  >
                    Make Appointment
                  </Button>
                </Grid2>
              </Grid2>
            </Paper>
          ))
        ) : (
          <Typography variant="h5" color="textSecondary" align="center">No results were found.</Typography>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{selectedUser.role} Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">Full Name: {selectedUser.fullName}</Typography>
            {selectedUser.role === 'Doctor' ? (
              <>
                <Typography>Specialization: {selectedUser.specialization}</Typography>
                <Typography>Qualifications: {selectedUser.qualifications}</Typography>
                <Typography>Bio: {selectedUser.bio}</Typography>
              </>
            ) : (
              <>
                <Typography>Address: {selectedUser.address}</Typography>
                <Typography>Medical History: {selectedUser.medical_History}</Typography>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} aria-labelledby="appointment-dialog-title">
          <DialogTitle id="appointment-dialog-title">Select a Timeslot</DialogTitle>
          <DialogContent>
              <List>
                  {timeslots.map(slot => (
                      <ListItem button key={slot.timeslotId} onClick={() => handleBookAppointment(slot.timeslotId)}>
                          <Typography variant="subtitle1">Start Time: {new Date(slot.startTime).toLocaleString()} - End Time: {new Date(slot.endTime).toLocaleString()}</Typography>
                      </ListItem>
                  ))}
              </List>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => setAppointmentModalOpen(false)} color="primary">Close</Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchTab;