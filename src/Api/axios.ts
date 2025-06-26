import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
   const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['authorization'] = `Bearer ${accessToken}`;
    }
    const isFormData = config.data instanceof FormData;
    if (!isFormData && config.headers && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
