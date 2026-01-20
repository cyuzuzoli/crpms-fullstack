import axios from "axios";

const API_URL = "http://localhost:5000/api/records";

// Service Records
export const getServiceRecords = () => axios.get(API_URL);
export const addServiceRecord = (record) => axios.post(API_URL, record);
export const updateServiceRecord = (id, record) => axios.put(`${API_URL}/${id}`, record);
export const deleteServiceRecord = (id) => axios.delete(`${API_URL}/${id}`);

// Cars (for dropdowns)
export const getCars = () => axios.get("http://localhost:5000/api/cars");

// Services (for dropdowns)
export const getServices = () => axios.get("http://localhost:5000/api/services");
