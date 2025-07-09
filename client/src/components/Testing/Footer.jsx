import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="team-info">
          <h3>Created by</h3>
          <p><strong>Team Code Smiths</strong></p>
          <p>Leader: Ankit Trivedi</p>
        </div>

        <div className="connect-info">
          <h3>Connect with Us</h3>
          <ul>
            <li>📧 <a href="mailto:codesmiths@example.com">Email</a></li>
            <li>💻 <a href="https://github.com/CodeSmithsOrg" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li>🔗 <a href="https://www.linkedin.com/in/ankit-trivedi" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Code Smiths. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
