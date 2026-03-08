import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);

// Student API calls
export const getAllStudents = () => api.get("/api/students");
export const getStudentById = (id) => api.get(`/api/students/${id}`);
export const createStudent = (data) => api.post("/api/students", data);
export const updateStudent = (id, data) => api.put(`/api/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);