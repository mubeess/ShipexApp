import axios from 'axios';

export const API_URL = 'https://shippex-demo.bc.brandimic.com/api/method';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
