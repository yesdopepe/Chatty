import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./constants";

const axiosWithAuth = axios.create({
  baseURL: API_BASE_URL,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
