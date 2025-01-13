import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Box, Typography, Paper, Grid2
} from '@mui/material';
import {
  LocalizationProvider,
  StaticDateTimePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';

const TimeslotManagementTab = ({ doctorId }) => {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [timeslots, setTimeslots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTimeslots();
    }, []);

    const fetchTimeslots = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://localhost:7038/api/timeslot`);
            const data = await response.json();
            setTimeslots(data.filter(t => t.doctorId === doctorId));
        } catch (error) {
            console.error('Failed to fetch timeslots', error);
        }
        setLoading(false);
    };

    const handleAddTimeslot = async () => {
        const newTimeslot = {
            doctorId,
            startTime: format(startTime, "yyyy-MM-dd'T'HH:mm:ss"),
            endTime: format(endTime, "yyyy-MM-dd'T'HH:mm:ss"),
            isAvailable: true
        };
        try {
            const response = await fetch('https://localhost:7038/api/timeslot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTimeslot)
            });
            if (response.ok) {
                fetchTimeslots();
            } else {
                console.error('Failed to add timeslot');
            }
        } catch (error) {
            console.error('Failed to add timeslot', error);
        }
    };

    const handleEditTimeslot = async (timeslotId, newStart, newEnd) => {
        const updatedTimeslot = {
            timeslotId,
            doctorId,
            startTime: format(newStart, "yyyy-MM-dd'T'HH:mm:ss"),
            endTime: format(newEnd, "yyyy-MM-dd'T'HH:mm:ss"),
            isAvailable: true
        };
        try {
            const response = await fetch(`https://localhost:7038/api/timeslot/${timeslotId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTimeslot)
            });
            if (response.ok) {
                fetchTimeslots();
            } else {
                console.error('Failed to update timeslot');
            }
        } catch (error) {
            console.error('Failed to update timeslot', error);
        }
    };

    const handleDeleteTimeslot = async (timeslotId) => {
        try {
            const response = await fetch(`https://localhost:7038/api/timeslot/${timeslotId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchTimeslots();
            } else {
                console.error('Failed to delete timeslot');
            }
        } catch (error) {
            console.error('Failed to delete timeslot', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6">Manage Your Timeslots</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid2 container spacing={2} justifyContent={'center'}>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2">Start Time</Typography>
                        <StaticDateTimePicker
                            displayStaticWrapperAs="desktop"
                            label="Select Start Time"
                            value={startTime}
                            onChange={setStartTime}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2">End Time</Typography>
                        <StaticDateTimePicker
                            displayStaticWrapperAs="desktop"
                            label="Select End Time"
                            value={endTime}
                            onChange={setEndTime}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid2>
                </Grid2>
            </LocalizationProvider>
            <Button onClick={handleAddTimeslot} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add Timeslot
            </Button>
            <Box sx={{ marginTop: 2 }}>
                {loading ? <Typography>Loading...</Typography> : (
                    timeslots.map((slot) => (
                        <Paper key={slot.timeslotId} elevation={2} sx={{ margin: 2, padding: 2 }}>
                            <Grid2 container spacing={2} alignItems="center" justifyContent="space-between">
                                <Grid2 item xs={6}>
                                    <Typography variant="subtitle1">Start Time: {new Date(slot.startTime).toLocaleString()}</Typography>
                                    <Typography variant="subtitle1">End Time: {new Date(slot.endTime).toLocaleString()}</Typography>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <Button variant="contained" color="primary" onClick={() => handleEditTimeslot(slot.timeslotId, startTime, endTime)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteTimeslot(slot.timeslotId)} sx={{ marginLeft: 1 }}>
                                        Delete
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default TimeslotManagementTab;
