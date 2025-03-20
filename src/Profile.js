import React, { useState, useEffect } from "react";
import { getCurrentUser, fetchUserAttributes, updateUserAttributes } from "@aws-amplify/auth";
import "./Profile.css"; // Ensure this file exists

function Profile({ user, onUpdate }) {
  console.log("User object:", user); // Debugging: Check if user data exists

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user attributes when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes(currentUser);

        setFormData({
          name: attributes.name || "",
          email: attributes.email || "",
        });

        console.log("Fetched user attributes:", attributes); // Debugging
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (!user?.attributes?.name || !user?.attributes?.email) {
      fetchUserData();
    } else {
      setFormData({
        name: user.attributes.name,
        email: user.attributes.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const currentUser = await getCurrentUser();
      await updateUserAttributes(currentUser, {
        name: formData.name,
        email: formData.email,
      });

      setMessage("Profile updated successfully!");
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {message && <p className="message">{message}</p>}

      {isEditing ? (
        <>
          <div className="form-group">
            <label><strong>Name:</strong></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label><strong>Email:</strong></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <button onClick={handleUpdate} className="save-button">Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {formData.name || "Not available"}</p>
          <p><strong>Email:</strong> {formData.email || "Not available"}</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
        </>
      )}
    </div>
  );
}

export default Profile;
