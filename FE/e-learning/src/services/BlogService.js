import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const getAllBlogs = async (page, pageSize, categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/blog`, {
      params: {
        page,
        pageSize,
        ...(categoryId && { categoryId }),
      },
    });

    console.log("Data:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching blogs:", error.message); 
  }
};
const getBlogById = async (id) => {
  try {
    console.log("Call API with id:", id);
    const response = await axios.get(`${API_URL}/blog/${id}`);
    console.log("Blog by ID Data:", response.data);
    return response.data.result;
  }
  catch (error) {
    console.error("Error fetching blog by ID:", error.message);
  }
}
  
export const BlogService = {
    getAllBlogs,
    getBlogById
};