import api from "../api/axios"
const getCourses = async (
  {
    page = 0,
    pageSize = 6,
    categoryId,
    minPrice,
    maxPrice,
    discountPercent,
    title,
  },
  token
) => {
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
    if (title) params.title = title;
    console.log("token:", token);

    const res = await api.get("/course/filter", {
      params
    });
    // console.log("res", res);

    return res.data.result;
  } catch (error) {
    console.error("Config:", error.message);
  }
};
const getDetailCourse = async (id) => {
  try {
    const res = await api.get(`/course/detail/${id}`);
    // console.log("detail:", res);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
const searchCourse = async (value) => {
  try {
    const res = await api.get(`/course/search?name=${value}`);
    // console.log(
    //   " URL:",
    //   axios.getUri({ url: `${API_URL}/course/search?name=${value}` })
    // );
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
// const getMycourse = async (token) => {
//   try {
//     const res = await axios.get(`${API_URL}/enrollment/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log("api request:",res);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };
const getMycourse = async ({ token, page = 0, pageSize = 4 }) => {
  try {
    const params = { page, pageSize };
    console.log("token la:", token);

    const res = await api.get("/enrollment/me", {
      params
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
const getCourseContent = async (courseId) => {
  try {
    const res = await api.get(`/course/${courseId}/content`);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
const getMaterialById = async (idCourse, idMaterial) => {
  try {
    const response = await api.get(
      `/enrollment/course/${idCourse}/material/${idMaterial}`
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching video url by ID:", error.message);
  }
};
const getRating = async (id) => {
  try {
    const response = await api.get(`course/${id}/ratings`);
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
};
const checkRating = async (id) => {
  try {
    const res = await api.get(
      `/rating/exists/course/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const ratingCourse = async (body, id) => {
  try {
    const res = await api.post(`rating/course/${id}`, body);
    return res;
  } catch (err) {
    console.log(err);
  }
};
const findTopSellingCourses = async () => {
  try {
    const res = await api.get("/course/top-selling");
    console.log("top-selling:", res);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
export const CourseService = {
  getMycourse,
  getCourses,
  getDetailCourse,
  searchCourse,
  getCourseContent,
  getMaterialById,
  getRating,
  checkRating,
  ratingCourse,
  findTopSellingCourses,
};
