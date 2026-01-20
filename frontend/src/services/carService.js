import axios from "axios";

const API_URL = "http://localhost:5000/api/cars/";

// Get all cars
export const getCars = () => {
  return axios.get(API_URL);
};

// Get car by ID
export const getCarById = (id) => {
  return axios.get(`${API_URL}${id}`);
};

// Add a new car
export const addCar = (carData) => {
  return axios.post(API_URL, carData);
};

// Delete a car
export const deleteCar = (id) => {
  return axios.delete(`${API_URL}${id}`);
};
