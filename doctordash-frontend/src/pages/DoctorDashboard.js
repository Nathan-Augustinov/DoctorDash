import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Profile from './Profile';  // Reuse or customize for doctors
// import Appointments from './Appointments';  // Customize for doctor's appointments management
// import StartTab from './StartTab';  // Customize for doctor-specific notifications and alerts
import DoctorSidebar from '../components/DoctorSidebar';
import PatientStartTab from '../components/PatientStartTab';

const DoctorDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DoctorSidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="start" element={<PatientStartTab />} />
          <Route path="profile" element={<PatientStartTab />} />
          <Route path="appointments" element={<PatientStartTab />} />
          <Route path="/" element={<Navigate replace to="start" />} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorDashboard;