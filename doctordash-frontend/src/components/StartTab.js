import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StartTab = ({ role }) => {
  const [appointments, setAppointments] = useState([]);
  const [profileComplete, setProfileComplete] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    checkProfileCompletion();
  }, []);

  const fetchAppointments = () => {
    if (role === "patient") {
      setAppointments([
        { id: 1, date: '2024-10-01', time: '15:00', doctor: 'Dr. Smith' }
      ]);
    } else {
      setAppointments([
        { id: 1, date: '2024-10-01', time: '15:00', patient: 'John Doe', issue: 'Routine Checkup' }
      ]);
    }
  };

  const checkProfileCompletion = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const apiUrl = `https://localhost:7038/api/${role}/${userId}`;
    const response = await fetch(apiUrl);
    const profileData = await response.json();

    const isComplete = role === 'doctor' 
      ? profileData.specialization && profileData.qualifications && profileData.bio
      : profileData.address && profileData.medical_History;
    setProfileComplete(isComplete);
  };

  const handleCompleteProfile = () => {
    navigate(role === "patient" ? '/patient-home/profile' : '/doctor-home/profile');
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
      {appointments.map(appointment => (
        <Box key={appointment.id} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
          <Typography>Date: {appointment.date}</Typography>
          <Typography>Time: {appointment.time}</Typography>
          <Typography>{role === "patient" ? `Doctor: ${appointment.doctor}` : `Patient: ${appointment.patient} - Issue: ${appointment.issue}`}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StartTab;