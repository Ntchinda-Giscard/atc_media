'use client';

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    // 'Content-Type': 'multipart/form-data',
  },
});

// Attach interceptor immediately (outside of hook)
api.interceptors.request.use(
  async (config) => {
    const rawToken = Cookies.get('auth_token'); // assuming the token is stored in a cookie
    const token = rawToken ?? "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // fallback hardcoded token for testing
      config.headers.Authorization = "Bearer ";
    }

    if (config?.data?.multipart) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    console.log("payload", config.data);

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('Response headers:', response?.headers);
    console.log('Content-Type:', response?.headers['content-type']);
    console.log('Raw data:', response?.data);
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized, redirecting...');
    }
    return Promise.reject(error);
  }
);

export default api;
