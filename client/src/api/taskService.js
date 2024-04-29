import api from './index';

const taskApi = {
  index: async () => {
    const response = await api.get('/task/index');
    return response.data;
  },
  store: async ({ title, status }) => {
    const response = await api.post('/task/store', { title, status });
    return response.data;
  },
  update: async ({ id, title, status }) => {
    const response = await api.put(`/task/update/${id}`, { title, status });
    return response.data;
  },
  destroy: async id => {
    const response = await api.delete(`/task/destroy/${id}`);
    return response.data;
  }
};

export default taskApi;
