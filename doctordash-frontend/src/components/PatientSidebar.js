import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import { Drawer, Typography, Box } from '@mui/material';

const PatientSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          Patient Dashboard
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Start" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default PatientSidebar;