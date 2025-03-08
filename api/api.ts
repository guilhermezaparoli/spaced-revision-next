import axios from "axios";



console.log(process.env.NEXT_PUBLIC_BASE_URL);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
  
      location.href = "/signin"; 
    }
    return Promise.reject(error);
  }
);

export default api;
