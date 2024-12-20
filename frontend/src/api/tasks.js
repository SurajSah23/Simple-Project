import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// Create a task (excluding '_id' and 'createdAt' from Task)
export const createTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

// Update an existing task by ID
export const updateTask = async (id, task) => {
  const response = await axios.patch(`${API_URL}/tasks/${id}`, task);
  return response.data;
};

// Delete a task by ID
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
