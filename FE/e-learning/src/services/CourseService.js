import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const getCourses = async ({
  page = 0,
  pageSize = 6,
  categoryId,
  minPrice,
  maxPrice,
  discountPercent,
}) => {
  try {
    const params = {
      page,
      pageSize,
    };

    // chỉ append nếu có chọn filter
    if (categoryId) params.categoryId = categoryId;
    if (minPrice != null) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (discountPercent) params.discountPercent = discountPercent;

    const res = await axios.get(`${API_URL}/course/filter`, { params });
    console.log(
      " URL:",
      axios.getUri({ url: `${API_URL}/course/filter`, params })
    );
    // console.log("res", res);

    return res.data.result;
  } catch (error) {
    console.error("Config:", error.message);
  }
};
const getDetailCourse = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/course/detail/${id}`);
    // console.log("detail:", res);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
const searchCourse = async (value) => {
  try {
    const res = await axios.get(`${API_URL}/course/search?name=${value}`);
    // console.log(
    //   " URL:",
    //   axios.getUri({ url: `${API_URL}/course/search?name=${value}` })
    // );
    return res.data.result
  } catch (err) {
    console.log(err);
  }
};
export const CourseService = {
  getCourses,
  getDetailCourse,
  searchCourse,
};
