import api from '../api/axios.js';
const getMessagesByMaterialId = async (materialId) => {
    try {
        const res = await api.get(`material/${materialId}/messages`);
        return res.data.result;
    } catch (error) {
        if (error.response) {
        console.log("Error response data:", error.response.data);
        return error.response.data; 
        }
        throw error; 
    }
}
const MaterialService = {
  getMessagesByMaterialId,
};

export default MaterialService;