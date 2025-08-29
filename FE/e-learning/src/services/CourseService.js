import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const getCourses = async ({
  page = 0,
  pageSize = 6,
  categoryId,
  minPrice,
  maxPrice,
}) => {
  try {
    const params = {
      page,
      pageSize,
    };

    // chỉ append nếu có chọn filter
    if (categoryId) params.categoryId = categoryId;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    const res = await axios.get(`${API_URL}/course/filter`, { params });
    console.log(" URL:", axios.getUri({ url: `${API_URL}/course/filter`, params }));
    console.log("res",res)

    return res.data.result.content;
  } catch (error) {
    console.error("Config:", error.message);
  }
};
export const CourseService = {
  getCourses,
};
