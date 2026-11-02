import axios from 'axios';

// Admin login
export const adminLogin = async (credentials) => {
  const { data } = await axios.post('/admin/login', credentials);
  return data;
};

// Fetch admin profile
export const fetchAdminProfile = async (token) => {
  const { data } = await axios.get('/admin/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Fetch all users
export const fetchAllUsers = async (token) => {
  const { data } = await axios.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Fetch all orders
export const fetchAllOrders = async (token) => {
  const { data } = await axios.get('/admin/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Delete a user
export const deleteUser = async (token, userId) => {
  const { data } = await axios.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Update order status
export const updateOrderStatus = async (token, orderId, status) => {
  const { data } = await axios.put(
    `/admin/orders/${orderId}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

// Create a restaurant
export const createRestaurant = async (token, restaurantData) => {
  const { data } = await axios.post('/admin/restaurants', restaurantData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Delete a restaurant
export const deleteRestaurant = async (token, restaurantId) => {
  const { data } = await axios.delete(`/admin/restaurants/${restaurantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
