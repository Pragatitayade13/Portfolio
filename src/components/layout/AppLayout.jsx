import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* FLOATING BACKGROUND BLOBS (LIGHT MODE ANIMATIONS) */}
      <div className="theme-blobs" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <Header />
      <MainContent />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AppLayout;
