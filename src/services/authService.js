import { apiClient, setAuthTokens, clearAuthTokens } from './apiClient';

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/jwt/create/', credentials);
  setAuthTokens(response.data);

  try {
    await getCurrentUser();
  } catch {

  }
  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) throw new Error('No refresh token');
  const response = await apiClient.post('/auth/jwt/refresh/', { refresh });
  setAuthTokens({ access: response.data.access, refresh });
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await apiClient.post('/auth/jwt/verify/', { token });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await apiClient.post('/auth/users/', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/users/me/');
  const data = response.data;
  if (Array.isArray(data)) {
    const user = data[0] || null;
    if (user) {
      localStorage.setItem('userRole', user.role || '');
      localStorage.setItem('userId', String(user.id));
    }
    return user;
  }
  if (data) {
    localStorage.setItem('userRole', data.role || '');
    localStorage.setItem('userId', String(data.id));
  }
  return data;
};

export const logout = () => {
  clearAuthTokens();
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
};

