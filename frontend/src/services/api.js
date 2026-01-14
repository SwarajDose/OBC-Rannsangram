const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Contact Form API
export const contactAPI = {
  submit: async (formData) => {
    return apiRequest('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  getAll: async () => {
    return apiRequest('/contact/submissions', {
      method: 'GET',
    });
  },

  delete: async (id) => {
    return apiRequest(`/contact/submissions/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const authAPI = {
  login: async (username, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  verify: async () => {
    return apiRequest('/auth/verify', {
      method: 'GET',
    });
  },
};

// Query Form API
export const queryAPI = {
  submit: async (formData) => {
    return apiRequest('/query/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  getAll: async () => {
    return apiRequest('/query/submissions', {
      method: 'GET',
    });
  },

  delete: async (id) => {
    return apiRequest(`/query/submissions/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  contactAPI,
  authAPI,
  queryAPI,
};

