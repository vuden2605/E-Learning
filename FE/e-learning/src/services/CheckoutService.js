import api from '../api/axios.js';
const checkout = async () => {
    try {
        const res = await api.post('/momo/checkout');
        console.log(res.data.result);
        return res.data.result; 
    } catch (error) {
        if (error.response) {
        console.log("Error response data:", error.response.data);
        return error.response.data; 
        }
        throw error; 
    }
}
export const CheckoutService = {
    checkout
};