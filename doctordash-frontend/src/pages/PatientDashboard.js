import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
// import Profile from './Profile';
// import Appointments from './Appointments';
import PatientStartTab from '../components/PatientStartTab';
import PatientSidebar from '../components/PatientSidebar';

const PatientDashboard = () => {
return (
    <div style={{ display: 'flex' }}>
      <PatientSidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="start" element={<PatientStartTab />} />
          <Route path="profile" element={<PatientStartTab />} />
          <Route path="appointments" element={<PatientStartTab />} />
          <Route path="/" element={<Navigate replace to="start"/>} />
        </Routes>
      </main>
    </div>
  );
};


export default PatientDashboard;