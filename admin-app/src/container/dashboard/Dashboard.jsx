// Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="containers">
      <Sidebar />
      <div className="content">

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
