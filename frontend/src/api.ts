import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};



export const signup = async (name:string ,email: string, password: string) =>{
  return axios.post(`${API_URL}/signup`, {name, email, password });

}

export const login = async (name:string,  email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { name ,email, password });
  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("userName", res.data.name);
  localStorage.setItem("userEmail", res.data.email);
  return res.data;
};

export const getTask = async(taskId : string) => {
  try{
    const response = await axios.get(`${API_URL}/tasks/${taskId}`);
    return response.data;
  }catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
  
}
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data; // { tasks: [...] }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getUser = async (userId: string) =>{
  try{
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching user",error);
    throw error;
  }
}

export const addTask = async (
  title: string,
  priority: string,
  category: string,
  dueDate: Date,
  completed: boolean,
  pinned : boolean
) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/addTask`, {
      title,
      category,
      priority,
      dueDate,
      completed,
      pinned   
    });
    
    return response.data; // ✅ return data to caller

  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // rethrow so caller can handle
  }
};

export const updateTask = (taskId: string, completed: boolean) => {
  const res = fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res;
};
  // axios.patch(`${API_URL}/tasks/${id}?completed=${completed}`);

export const deleteTask = (id: string) => axios.delete(`${API_URL}/tasks/${id}`);

export const updatePinnedTask = (taskId: string, pinned: boolean) => {
  const res = fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pinned }),
  });
  return res;
};

