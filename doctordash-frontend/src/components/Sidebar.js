import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Drawer, Typography, Box } from '@mui/material';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionExpiry');
    navigate('/login', { replace: true });
  };

  const paths = {
    start: `/${role.toLowerCase()}-home/start`,
    profile: `/${role.toLowerCase()}-home/profile`,
    appointments: `/${role.toLowerCase()}-home/appointments`
  };

  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          {role} Dashboard
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to={paths.start}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Start" />
        </ListItem>
        <ListItem button component={Link} to={paths.profile}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to={paths.appointments}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;