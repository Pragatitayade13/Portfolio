import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggler" onClick={toggleTheme} aria-label="Toggle light or dark theme">
      {theme === 'light' ? (
        <Moon size={20} className="moon-icon" />
      ) : (
        <Sun size={20} className="sun-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
