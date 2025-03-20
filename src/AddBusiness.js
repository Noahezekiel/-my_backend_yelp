import React, { useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { createBusiness } from "./graphql/mutations";
import { getCurrentUser } from "@aws-amplify/auth";
import "./AddBusiness.css";

function AddBusiness() {
  const [businessData, setBusinessData] = useState({
    name: "",
    address: "",
    phone: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getCurrentUser();
      console.log("Submitting business data:", businessData);

      const client = generateClient();
      const newBusiness = await client.graphql({
        query: createBusiness,
        variables: { input: { ...businessData, owner: user.username } },
      });

      console.log("Business added successfully!", newBusiness);
      alert("Business added!");

      // Reset form
      setBusinessData({
        name: "",
        address: "",
        phone: "",
        category: "",
        description: "",
      });

    } catch (error) {
      console.error("Error adding business:", JSON.stringify(error, null, 2));
      alert(`Failed to add business: ${error.message || JSON.stringify(error)}`);
    }
  };

  return (
    <div className="add-business-container">
      <h2>Add Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name:</label>
          <input type="text" name="name" value={businessData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={businessData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={businessData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={businessData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={businessData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Add Business</button>
      </form>
    </div>
  );
}

export default AddBusiness;
