import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL + '/api'
});

api.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  };
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    throw error.response;
  }
);

export default api;
