import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/category`);
    return response.data.result;
}
export const CategoryService = {
    getAllCategories
};