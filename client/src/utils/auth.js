import authApi from '../api/authService';

const auth = {
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const response = await authApi.verifyToken();
      return response.user;
    } catch (error) {
      return false;
    }
  }
};

export default auth;
