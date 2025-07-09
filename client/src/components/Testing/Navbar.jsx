import React, { useState } from 'react';
import './Navbar.css';
import IMAGES from '../../assets/Weather-icons/asset';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img
            src={IMAGES.logo}
            alt="your logo here"
          />
        </div>

        <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Map</a></li>
          <li><a href="#">Graph</a></li>
          <li><a href="#">Account</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
