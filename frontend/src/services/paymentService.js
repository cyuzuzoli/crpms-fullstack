import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

// Get all payments
export const getPayments = () => axios.get(API_URL);

// Add a new payment
export const addPayment = (payment) => axios.post(API_URL, payment);

// Update a payment
export const updatePayment = (id, updatedPayment) => axios.put(`${API_URL}/${id}`, updatedPayment);

// Delete a payment
export const deletePayment = (id) => axios.delete(`${API_URL}/${id}`);
