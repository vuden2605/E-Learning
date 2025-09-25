import api from '../api/axios.js';

const addToCart = async (courseId) => {
  try {
    const res = await api.post('/cart/item', { courseId });
    return res.data.result; // thành công
  } catch (error) {
    if (error.response) {
      console.log("Error response data:", error.response.data);
      throw error.response.data; 
    }
    throw error; 
  }
};
const getMyCart = async () => {
  try {
    const res = await api.get('/cart/myCart');
    console.log(res.data.result);
    return res.data.result; // thành công
  } catch (error) {
    if (error.response) {
      console.log("Error response data:", error.response.data);
      return error.response.data; 
    }
    throw error; 
  }
}
const removeFromCart = async (courseId) => {
  try {
    const res = await api.delete(`/cart/${courseId}`);
    return res.data.result; // thành công
  } catch (error) {
    if (error.response) {
      console.log("Error response data:", error.response.data);
      return error.response.data; 
    }
    throw error; 
  }
}
export const CartService = { 
  addToCart,
  getMyCart,
  removeFromCart
};
