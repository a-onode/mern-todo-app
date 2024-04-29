import api from './index';

const authApi = {
  login: async ({ email, password }) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async ({ name, email, password }) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  verifyToken: async () => {
    const response = await api.post('/auth/verify-token');
    return response.data;
  }
};

export default authApi;
