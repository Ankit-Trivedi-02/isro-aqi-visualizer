// Component 1: TopBar.jsx
import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="left-icons">
        <span className="logo">🌐</span>
        <span className="icon">🔔</span>
      </div>
      <input className="search-bar" type="text" placeholder="Search City...." />
      <div className="user-section">
        <span className="user-icon">👤</span>
        <span className="username">User Name</span>
      </div>
    </div>
  );
};

export default TopBar;