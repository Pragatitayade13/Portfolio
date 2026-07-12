import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const NotFoundPage = () => {
  return (
    <div className="page-container container not-found-container">
      <section className="error-section">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="page-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-back-home">
          Go Back Home
        </Link>
      </section>
    </div>
  );
};

export default NotFoundPage;
