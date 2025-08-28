import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const getAllBlogs = async ( page,pageSize,categoryId ) => {
    try {
      console.log("Calling API:", `${API_URL}/blog?page=${page}&pageSize=${pageSize}&categoryId={categoryId}`);
      const response = await axios.get(`${API_URL}/blog?page=${page}&pageSize=${pageSize}`);
      console.log("Data:", response.data.result);
      return response.data.result;
    } catch (error) {
      console.error("Config:", error.message); 
    }
};
  
export const BlogService = {
    getAllBlogs,
};