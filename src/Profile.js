import React, { useState } from "react";

function Profile({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.attributes?.name || "",
    email: user?.attributes?.email || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(formData); // Call the update function
    setIsEditing(false);
  };

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Loading user data...</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>User Profile</h2>

      {isEditing ? (
        <>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleUpdate} style={{ marginTop: "10px" }}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.attributes?.name}</p>
          <p><strong>Email:</strong> {user.attributes?.email}</p>
          <button onClick={() => setIsEditing(true)} style={{ marginTop: "10px" }}>Update</button>
        </>
      )}
    </div>
  );
}

export default Profile;
