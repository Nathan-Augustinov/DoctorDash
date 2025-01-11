import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PatientStartTab = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [profileComplete, setProfileComplete] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingAppointments();
    checkProfileCompletion();
  }, []);

  const fetchUpcomingAppointments = () => {
    setUpcomingAppointments([
      { id: 1, date: '2024-10-01', time: '15:00', doctor: 'Dr. Smith' }
    ]);
  };

  const checkProfileCompletion = () => {
    setProfileComplete(false);
  };

  const handleCompleteProfile = () => {
    navigate('/patient/profile');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      {!profileComplete && (
        <Box sx={{ margin: '20px 0', bgcolor: '#ffcccc', padding: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Your profile is incomplete. Please update your profile.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCompleteProfile}>
            Complete Profile
          </Button>
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        Upcoming Appointments
      </Typography>
      {upcomingAppointments.map(appointment => (
        <Box key={appointment.id} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
          <Typography>Date: {appointment.date}</Typography>
          <Typography>Time: {appointment.time}</Typography>
          <Typography>Doctor: {appointment.doctor}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientStartTab;