
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true, // if you're using cookies/auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
