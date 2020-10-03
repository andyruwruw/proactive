import axios from 'axios';

export default {
  async getUser() {
    let response = await axios.get('/api/check-user');
    return response.data;
  },
  async login(payload) {
    let response = await axios.put('/api/login', payload);
    return response.data;
  },
  async register(payload) {
    let response = await axios.put('/api/register', payload);
    return response.data;
  },
  async logout() {
    let response = await axios.put('/api/logout');
    return response.data;
  },
};
