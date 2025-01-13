import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://localhost:7038/api/appointment/getUserAppointments?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [userId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (appointments.length === 0) return <Typography>No appointments found.</Typography>;

  return (
    <Paper elevation={2} sx={{ margin: 2 }}>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.appointmentId}>
            <ListItemText
              primary={`Date: ${new Date(appointment.date).toLocaleDateString()} at ${new Date(appointment.date).toLocaleTimeString()}`}
              secondary={appointment.status}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AppointmentsList;