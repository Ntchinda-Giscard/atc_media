import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1',
  // withCredentials: true,
});

export default api;
