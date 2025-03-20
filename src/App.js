import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Profile from "./Profile";
import AddBusiness from "./AddBusiness"; 
import ViewBusinesses from "./ViewBusiness"; 

Amplify.configure(awsconfig);

const formFields = {
  signUp: {
    name: { label: "Full Name", placeholder: "Enter your full name", isRequired: true, order: 1 },
    email: { label: "Email", placeholder: "Enter your email", isRequired: true, order: 2 },
    password: { label: "Password", placeholder: "Enter your password", isRequired: true, order: 3 },
    confirm_password: { label: "Confirm Password", placeholder: "Re-enter your password", isRequired: true, order: 4 },
  },
};

// Dummy Home component
const Home = () => <h1 style={{ textAlign: "center", padding: "20px" }}>Welcome to My Yelp</h1>;

function App({ signOut, user }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <Router>
      <NavBar signOut={signOut} user={user} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        {user && <Route path="/profile" element={<Profile user={user} onUpdate={() => console.log("Profile Updated")} />} />}
        <Route path="/add-business" element={<AddBusiness />} /> 
        <Route path="/businesses" element={<ViewBusinesses />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App, { formFields });
