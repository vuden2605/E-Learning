import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/s3/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("link ảnh: ", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const FileService = {
  uploadFile,
};
