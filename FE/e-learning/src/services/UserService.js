import api from "../api/axios";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/profile");
    console.log("Current User:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
  }
};

const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    console.log("User by ID:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
  }
};

const updateUser = async (userData) => {
  try {
    const response = await api.patch("/user", userData);
    return response.data.result;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};


const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    console.log("Logout successful:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};
export const UserService = {
  getCurrentUser,
  getUserById,
  updateUser,
  logout,
};
