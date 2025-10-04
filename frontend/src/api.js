import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API functions
export const getEmployees = async (searchQuery = '') => {
  try {
    const params = searchQuery ? { search: searchQuery } : {};
    const response = await api.get('/employees', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employees', employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};

export default {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};