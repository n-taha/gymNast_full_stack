import axios from 'axios';

const apiBaseURL = "https://gym-management-api-qpyx.onrender.com/";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear tokens on unauthorized so UI reacts correctly
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
    return Promise.reject(error);
  },
);

export const setAuthTokens = ({ access, refresh }) => {
  if (access) localStorage.setItem('accessToken', access);
  if (refresh) localStorage.setItem('refreshToken', refresh);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

