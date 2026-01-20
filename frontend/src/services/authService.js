import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login user
export const loginUser = (credentials) => {
  return axios.post(API_URL + "/login", credentials);
};

// Register user (if needed)
export const registerUser = (user) => {
  return axios.post(API_URL + "/register", user);
};
