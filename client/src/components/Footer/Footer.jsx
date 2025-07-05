import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        
        <div className="footer-section credit">
          <h3>Created by</h3>
          <p>Team <strong>Code Smiths</strong></p>
          <p>Leader: <strong>Ankit Trivedi</strong></p>
        </div>

        <div className="footer-section connect">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="mailto:codesmiths.team@example.com">📧 Email</a></li>
            <li><a href="https://github.com/yourteam-repo" target="_blank">💻 GitHub</a></li>
            <li><a href="https://linkedin.com/in/ankit-trivedi" target="_blank">🔗 LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Code Smiths. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
