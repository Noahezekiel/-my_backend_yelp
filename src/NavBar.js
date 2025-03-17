// // NavBar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./assets/logo.jpeg";

function NavBar({ signOut, user, handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="MyYelp Logo" className="logo-image" />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search businesses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearchClick}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        {user && <Link to="/profile" className="profile-link">Profile</Link>}
      </div>

      <div className="user-section">
        {user ? (
          <>
            <span className="user-name">Hi, {user.attributes?.name || "User"}!</span>
            <button onClick={signOut} className="sign-out-button">Sign Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
