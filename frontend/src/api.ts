import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};



export const signup = (email: string, password: string) =>{
  axios.post(`${API_URL}/signup`, { email, password });
}

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const getTodayTasks = () => axios.get(`${API_URL}/tasks/today`, { headers: getAuthHeader() });
export const getHistory = () => axios.get(`${API_URL}/tasks/history`);
export const addTask = (title: string) => axios.post(`${API_URL}/tasks`, { title });
export const updateTask = (id: string, completed: boolean) =>
  axios.patch(`${API_URL}/tasks/${id}?completed=${completed}`);
export const deleteTask = (id: string) => axios.delete(`${API_URL}/tasks/${id}`);
