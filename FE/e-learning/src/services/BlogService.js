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

  
export const BlogService = {
    getAllBlogs,
};