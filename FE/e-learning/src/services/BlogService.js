import axios from 'axios';
const API_URL = process.env.API_URL;
const getAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/elearning/api/blog");
      console.log("Data:", response.data.result);
      return response.data.result;
    } catch (error) {
      console.error("Config:", error.message); 
    }
};
  
export const BlogService = {
    getAllBlogs,
};