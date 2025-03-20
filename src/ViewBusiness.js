import React, { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listBusinesses } from "./graphql/queries";
import "./ViewBusiness.css";

function ViewBusinesses() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const client = generateClient();
        const data = await client.graphql({
          query: listBusinesses,
        });
        setBusinesses(data.data.listBusinesses.items);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    }
    fetchBusinesses();
  }, []);

  return (
    <div className="view-businesses-container">
      <h2>View Businesses</h2>
      <ul>
        {businesses.map((business) => (
          <li key={business.id} className="business-item">
            <strong>{business.name}</strong> - {business.address} - {business.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewBusinesses;
