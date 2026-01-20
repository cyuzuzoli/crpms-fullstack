import axios from "axios";

const API_URL = "http://localhost:5000/api/services";

// Get all services
export const getServices = () => {
  return axios.get(API_URL);
};

// Add a new service
export const addService = (service) => {
  return axios.post(API_URL, service);
};

// Update service
export const updateService = (id, updatedService) => {
  return axios.put(`${API_URL}/${id}`, updatedService);
};

// Delete service
export const deleteService = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
