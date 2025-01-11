import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    if (!sessionExpiry || Date.now() > parseInt(sessionExpiry)) {
      logoutUser();
    } else {
        setTimeout(logoutUser, parseInt(sessionExpiry) - Date.now());
    }
    
  };

  const logoutUser = () => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && currentPath !== '/register') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('sessionExpiry');
      
      window.location.href = '/login';
    }
  };

  const roleRedirect = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');

    if (!isLoggedIn) {
      return "/login";
    }

    return role === "Doctor" ? "/doctor-home" : "/patient-home";
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/doctor-home/*" element={<DoctorDashboard />} />
          <Route path="/patient-home/*" element={<PatientDashboard/>} />
          <Route path="/" element={<Navigate replace to={roleRedirect()}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
