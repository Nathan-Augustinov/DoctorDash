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
import SearchIcon from '@mui/icons-material/Search';
import { Drawer, Typography, Box, Divider } from '@mui/material';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionExpiry');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login', { replace: true });
  };

  const paths = {
    start: `/${role.toLowerCase()}-home/start`,
    profile: `/${role.toLowerCase()}-home/profile`,
    appointments: `/${role.toLowerCase()}-home/appointments`,
    search: `/${role.toLowerCase()}-home/search`
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" noWrap>
          {role} Dashboard
        </Typography>
      </Box>
      <List>
        <Divider />
        <ListItem button component={Link} to={paths.start}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Start" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={paths.profile}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={paths.appointments}>
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="Appointments" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={paths.search}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <Divider />
      </List>
      <Box sx={{ marginTop: 'auto' }}>
      <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;