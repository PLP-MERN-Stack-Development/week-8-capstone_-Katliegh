// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://week-8-capstone-katliegh.onrender.com/api", // ✅ NOT localhost
  withCredentials: false, // optional depending on cookies
});

export default instance;

