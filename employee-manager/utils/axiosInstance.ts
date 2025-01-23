import { API_BASE_URL } from "@/config/apiconfig";
import { ApiError } from "@/types/errors/common-errors";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error): Promise<ApiError> => {
    // Create a standardized error object
    const customError: ApiError = {
      message: error.response?.data?.message || "An unknown error occurred",
      status: error.response?.status,
      details: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default axiosInstance;
