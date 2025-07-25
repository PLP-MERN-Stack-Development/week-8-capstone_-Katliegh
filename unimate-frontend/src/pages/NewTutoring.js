import React, { useState, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../api/AuthContext";

export default function NewTutoring() {
  const [form, setForm] = useState({ title: "", description: "", subject: "", pricePerHour: "" });
  const { token } = useContext(AuthContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/tutoring", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Listing created!");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post Tutoring Listing</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <input name="pricePerHour" placeholder="Price per Hour" onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
}
