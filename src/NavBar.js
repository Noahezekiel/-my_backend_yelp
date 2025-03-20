// // NavBar.js

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./NavBar.css";
// import logo from "./assets/logo.jpeg";


// function NavBar({ signOut, user, handleSearch }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);

//   const handleSearchClick = () => {
//     handleSearch(searchQuery);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(searchQuery);
//     }
//   };

//   // const toggleBusinessDropdown = () => {
//   //   setIsBusinessDropdownOpen(!isBusinessDropdownOpen);
//   // };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <img src={logo} alt="MyYelp Logo" className="logo-image" />
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search businesses..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="search-button" onClick={handleSearchClick}>🔍</button>
//       </div>

//       <div className="links">
//         <Link to="/">Home</Link>
//         <div className="dropdown">
//           <button className="dropbtn" onClick={toggleBusinessDropdown}>Business</button>
//           <div className={`dropdown-content ${isBusinessDropdownOpen ? 'show' : ''}`}>
//             <Link to="/businesses">View Businesses</Link>
//             <Link to="/add-business">Add Business</Link>
//           </div>
//         </div>
//         {user && <Link to="/profile" className="profile-link">Profile</Link>}
//       </div>

//       <div className="user-section">
//         {user ? (
//           <>
//             <span className="user-name">Hi, {user.attributes?.name || "User"}!</span>
//             <button onClick={signOut} className="sign-out-button">Sign Out</button>
//           </>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default NavBar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./assets/logo.jpeg";

function NavBar({ signOut, user, handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);

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
        <button className="search-button" onClick={handleSearchClick}>🔍</button>
      </div>

      <div className="links">
        <Link to="/">Home</Link>

        {/* Business dropdown opens on hover */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsBusinessDropdownOpen(true)}
          onMouseLeave={() => setIsBusinessDropdownOpen(false)}
        >
          <span className="dropbtn">Business ▼</span>
          {isBusinessDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/businesses">View Businesses</Link>
              <Link to="/add-business">Add Business</Link>
            </div>
          )}
        </div>

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
