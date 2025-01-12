import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StartTab from '../components/StartTab';
import ProfileTab from '../components/ProfileTab';
import SearchTab from '../components/SearchTab';

const Dashboard = ({ role }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div style={{ display: 'flex' }}>
          <Sidebar role={capitalizeFirstLetter(role)}/>
          <main style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="start" element={<StartTab role={role}/>} />
              <Route path="profile" element={<ProfileTab role={role} />} />
              <Route path="appointments" element={<StartTab role={role} />} />
              <Route path="search" element={<SearchTab role={role} />} />
              <Route path="/" element={<Navigate replace to="start" />} />
            </Routes>
          </main>
        </div>
      );
}

export default Dashboard;