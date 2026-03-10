import { apiClient } from './apiClient';

// Classes
export const listClasses = async () => {
  const res = await apiClient.get('/api/v1/classes/');
  return res.data;
};

export const getClass = async (id) => {
  const res = await apiClient.get(`/api/v1/classes/${id}/`);
  return res.data;
};

// Class bookings
export const listClassBookings = async () => {
  const res = await apiClient.get('/api/v1/classbookings/');
  return res.data;
};

export const createClassBooking = async (fitnessClassId) => {
  try {
    console.debug('creating class booking', fitnessClassId);
    const res = await apiClient.post('/api/v1/classbookings/', {
      fitness_class: fitnessClassId,
    });
    console.debug('booking response', res.status, res.data);
    return res.data;
  } catch (err) {
    console.error('createClassBooking failed', fitnessClassId, err?.response?.status, err?.response?.data);
    throw err;
  }
};

// Memberships
export const listMemberships = async () => {
  const res = await apiClient.get('/api/v1/memberships/');
  return res.data;
};

// Subscriptions
export const listSubscriptions = async () => {
  const res = await apiClient.get('/api/v1/subscriptions/');
  return res.data;
};

export const createSubscription = async (data) => {
  const res = await apiClient.post('/api/v1/subscriptions/', data);
  return res.data;
};

export const getActiveSubscriptions = async () => {
  const res = await apiClient.get('/api/v1/subscriptions/active/');
  return res.data;
};

