import { useEffect, useState } from "react";
import { getTodayTasks, addTask, updateTask, deleteTask } from "../api";

interface Task {
  _id?: string;
  title: string;
  date: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTodayTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTask(newTask);
    setNewTask("");
    fetchTasks();
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTask(id, !completed);
    fetchTasks();
  };

    const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteTask(id);
    fetchTasks(); // refresh list after deletion
    };


  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Today's Tasks</h1>

      <div className="flex mb-4">
        <input
          className="flex-1 border p-2 rounded-l"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => handleToggle(task._id || "", task.completed)}
            >
              {task.title}
            </span>
            <button
              className="text-red-500"
              onClick={() => handleDelete(task._id || "")}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
