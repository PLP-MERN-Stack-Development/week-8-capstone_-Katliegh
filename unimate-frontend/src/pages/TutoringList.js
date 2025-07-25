import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function TutoringList() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/tutoring");
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch tutoring listings:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Tutoring Listings</h2>

      {listings.length === 0 ? (
        <p>No tutoring listings available.</p>
      ) : (
        listings.map(listing => (
          <div key={listing._id} className="card tutor-card">
            <h4>{listing.title}</h4>
            <p><strong>Subject:</strong> {listing.subject}</p>
            <p><strong>Rate:</strong> R{listing.pricePerHour}/hour</p>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Posted by:</strong> {listing.createdBy?.name || "Unknown"}</p>
          </div>
        ))
      )}
    </div>
  );
}



