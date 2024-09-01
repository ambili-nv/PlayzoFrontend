import axios from 'axios';
import showToast from './toaster';
import { ADMIN_API } from '../constants';

const axiosInstance = axios.create({
  baseURL: ADMIN_API,
});

// Add a request interceptor to include the authorization header
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
