import axios from 'axios'
import { toast } from "react-toastify";

export const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
});
  
authFetch.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "multipart/form-data";
  console.log('request sent');
  return config;
}, (error) => {
  return Promise.reject(error);
});

authFetch.interceptors.response.use((response) => {
  response.headers["Content-Type"] = "multipart/form-data";
  return response;
}, (error) => {
  console.log(error.response);
  if (error.request.status === 401) {
    toast.error('Auth Error')
  }
  return Promise.reject(error);
});

