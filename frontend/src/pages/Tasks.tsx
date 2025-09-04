import React, { useState, useEffect } from "react";
import { Plus, Filter } from "lucide-react";
import { addTask, getTasks ,getTask} from "../api";

interface Task {
  _id: string;
  title: string;
  category: string;
  priority: string;
  dueDate: string;
}

function Tasks() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTask, setShowTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  const AddTaskForm = () => {
    const [newTask, setNewTask] = useState({
      title: "",
      priority: "medium",
      category: "Work",
      dueDate: "",
    });

    const handleAddTask = async () => {
      addTask(
        newTask.title,
        newTask.priority,
        newTask.category,
        new Date(newTask.dueDate)
      );
      setShowAddTask(false);
    };

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Add New Task
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Marketing">Marketing</option>
                <option value="Development">Development</option>
                <option value="Meetings">Meetings</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setShowAddTask(false)}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks(); // 👈 fetch tasks from backend
      setTasks(response);
 // backend should send { tasks: [...] }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTask = async (taskId : string) => {
    try {
      const response = await getTask(taskId); 
      setShowTask(response);
    }
    catch (error) {
      console.error("Error fetching task:", error);
    } finally{
        setLoading(false);
    }
}

  useEffect(() => {
    fetchTasks();
  }, []);

  const getTaskDetails = () => {
  if (!showTask) return null; // guard clause

  return (
    <div className="mt-4 p-4 border rounded bg-blue-50">
      <h2 className="text-xl font-bold">{showTask.title}</h2>
      <p>Priority: {showTask.priority}</p>
      <p>Category: {showTask.category}</p>
      <p>Due Date: {new Date(showTask.dueDate).toLocaleDateString()}</p>

      <button 
        onClick={() => setShowTask(null)} 
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
      >
        Close
      </button>
    </div>
  );
};



  const GetTasks = () => {
    if (loading) return <p>Loading tasks...</p>;

    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Tasks</h1>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul className="space-y-3 cursor-pointer">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-3 border rounded-lg shadow bg-white flex justify-between"
                onClick={() => fetchTask(task._id)}
              >
                <div>
                  <h2 className="font-semibold">{task.title}</h2>
                  <p className="text-sm text-gray-500">
                    {task.category} | {task.priority}
                  </p>
                </div>
                <span className="text-sm text-gray-600">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    //   <div>
    //     {tasks && tasks.length > 0 ? (
    //       tasks.map((task, index) => (
    //         <div key={index}>
    //           <h3>{task.title}</h3>
    //           <p>{task.category}</p>
    //           <p>{task.priority}</p>
    //           <p>{task.dueDate}</p>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No tasks found.</p>
    //     )}
    //   </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>
      {showAddTask && <AddTaskForm />}
      <GetTasks />
      {showTask && getTaskDetails()}
      
    </div>
  );
}

export default Tasks;
