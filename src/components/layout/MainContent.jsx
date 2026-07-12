import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <Outlet />
    </main>
  );
};

export default MainContent;
