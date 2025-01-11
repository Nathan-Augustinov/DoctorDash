import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/" element={
            localStorage.getItem('isLoggedIn') === 'true' 
            ? <Navigate replace to="/home" /> 
            : <Navigate replace to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
