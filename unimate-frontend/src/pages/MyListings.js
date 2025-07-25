import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../api/AuthContext";

export default function MyListings() {
  const { token } = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/tutoring/mine", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(res.data);
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>My Tutoring Listings</h2>
      {listings.map((l) => (
        <div className="listing" key={l._id}>
          <h4>{l.title}</h4>
          <p>{l.description}</p>
        </div>
      ))}
    </div>
  );
}
