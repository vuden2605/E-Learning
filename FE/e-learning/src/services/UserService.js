import api from "../api/axios";

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

const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    console.log("User updated:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error updating user:", error.message);
  }
};

export  const UserService = {
  getCurrentUser,
  getUserById,
  updateUser,
};