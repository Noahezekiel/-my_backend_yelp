// NavBar.js
import React from "react";
import "./NavBar.css"; // Import CSS for styling

function NavBar({ signOut, user }) {

  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <div className="links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="user-section">
        {user ? (
          <>
            <span>{user.attributes?.name} 👋</span>
            <button onClick={signOut} className="sign-out-button">
              Sign Out
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
}

export default NavBar; // ✅ Ensure you export the component
