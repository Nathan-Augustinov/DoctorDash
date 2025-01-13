import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    search: `/${role.toLowerCase()}-home/search`,
    timeslots: `/${role.toLowerCase()}-home/timeslots`,
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
          background: 'linear-gradient(to bottom, #f0f4ff, #dfe9fc)',
          borderRight: '1px solid #dfe9fc',
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          background: '#6a11cb',
          color: 'white',
          borderBottom: '1px solid #dfe9fc',
        }}
      >
        <Typography variant="h6" noWrap>
          {role} Dashboard
        </Typography>
      </Box>
      <List>
        <Divider />
        {[
          { path: paths.start, label: 'Start', icon: <HomeIcon /> },
          { path: paths.profile, label: 'Profile', icon: <PersonIcon /> },
          { path: paths.appointments, label: 'Appointments', icon: <EventIcon /> },
          { path: paths.search, label: 'Search', icon: <SearchIcon /> },
          ...(role === 'Doctor'
            ? [{ path: paths.timeslots, label: 'Timeslots', icon: <AccessTimeIcon /> }]
            : []),
        ].map(({ path, label, icon }) => (
          <ListItem
            button
            component={Link}
            to={path}
            key={label}
            sx={{
              borderRadius: '8px',
              margin: '8px 16px',
              '&:hover': {
                background: '#2575fc',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: '#6a11cb' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        <Divider />
      </List>
      <Box sx={{ marginTop: 'auto', paddingBottom: 2 }}>
        <Divider />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: '8px',
            margin: '8px 16px',
            '&:hover': {
              background: '#ff5252',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ff5252' }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;