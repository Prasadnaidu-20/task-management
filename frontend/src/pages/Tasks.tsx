import React, { useState, useEffect } from "react";
import { Plus, Filter, Check, X,MoreHorizontal,CheckCircle2,Circle } from "lucide-react";
import { addTask, getTasks, getTask, deleteTask, updateTask ,updatePinnedTask} from "../api";
import { Pin, Trash2 } from 'lucide-react';


interface Task {
  _id: string;
  title: string;
  category: string;
  priority: string;
  dueDate: string;
  completed: boolean; 
  pinned: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTask, setShowTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

const handleUpdateTask = (taskId: string, completed: boolean) => {
  try {
    updateTask(taskId, completed);

    // update local tasks state so UI refreshes
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed } : task
      )
    );
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

  const handleDelete = async () => {
    if (!showTask) return;
    await deleteTask(showTask._id);
    setShowTask(null);
    setTasks(tasks.filter((task) => task._id !== showTask._id));
  };

  const handlePinTask = async (taskId: string,pinned: boolean) => {
    try {
      const taskToPin = tasks.find((task) => task._id === taskId);
      await updatePinnedTask(taskId, !taskToPin?.pinned);
      if (!taskToPin) return;

      setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, pinned } : task
      )
    );
    }
    
    catch (error) {
      console.error("Error pinning task:", error);
    }
  }

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

  const fetchTask = async (taskId: string) => {
    try {
      const response = await getTask(taskId);
      setShowTask(response);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const AddTaskForm = () => {
    const [newTask, setNewTask] = useState({
      title: "",
      priority: "medium",
      category: "Work",
      dueDate: "",
      completed : false,
      pinned : false
    });

    const handleAddTask = async () => {
      try{
        const response = await addTask(
        newTask.title,
        newTask.priority,
        newTask.category,
        new Date(newTask.dueDate),
        false,
        false
        );

        setTasks((prevTasks)=>[...prevTasks, response.task]); // add new task to list

        setShowAddTask(false);

      }catch (error) {
        console.error("Error adding task:", error);
      }
      
    };
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 w-full  max-w-md shadow-2xl border border-white/20">
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
                className="w-full bg-white px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full bg-white px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className=" bg-white w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full bg-white px-4 py-3 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setShowAddTask(false)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
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

  const getTaskDetails = () => {

    if (!showTask) return null; // guard clause


    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm w-full flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
          <div className="flex space-x-2 mt-4">
            <h2 className="text-xl font-bold w-3/4">{showTask.title}</h2>
            <div className="flex space-x-2 justify-end h-8">
            <button
              onClick={() => handleUpdateTask(showTask._id, true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              <Check className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleUpdateTask(showTask._id, false)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              <X className="w-3 h-3" />
            </button>
            </div>
          </div>
          <div className="mt-2">
          <p>Priority: {showTask.priority}</p>
          <p>Category: {showTask.category}</p>
          <p>Due Date: {new Date(showTask.dueDate).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setShowTask(null)}
              className="mt-2 px-7 py-1 bg-blue-500 text-white rounded"
            >
              Close
            </button>

            <button
              onClick={handleDelete}
              className="mt-2 px-7 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const GetTasks = () => {
    
    if (loading) return <p>Loading tasks...</p>;

    return (

    tasks.map((task,index) =>(
    <div key= {index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.00] group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <button onClick={() => handleUpdateTask(task._id,!task.completed)} className="bg-white mt-1 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white-500">
            {task.completed === true ? 
              <CheckCircle2 className="bg-white w-6 h-6 text-green-500" /> : 
              <Circle className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
            }
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold text-lg ${task.completed === true ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {task.title}
            </h3>
            <p className="text-slate-600 mt-1">{task.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
      
        {task.pinned && (
          <Pin className="w-5 h-5 text-yellow-500" />
          )}
        </div>
        
        <button onClick={(e)=>{
          e.stopPropagation();
          setActiveDropdown(task._id)
          }} 
          className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal className="w-5 h-5" />
        </button>
        {activeDropdown === task._id && (
          <div className="absolute right-0 top-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 py-3 z-50 min-w-40 animate-in slide-in-from-top-2 duration-200">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlePinTask(task._id,!task.pinned);
                setActiveDropdown("");    
              }}
              className="bg-white w-full px-5 py-3 text-left text-sm text-black text-slate-700 hover:bg-blue-600 text-white flex items-center transition-all rounded-xl mx-2"
            >
              <Pin className="w-4 h-4 mr-3 text-blue-500" />
              <span className="font-medium text-black">{task.pinned ? "Unpin":"Pin"}</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                fetchTask(task._id);
                handleDelete();
                setActiveDropdown("");
                
              }}
              className="w-full px-5 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-all rounded-xl mx-2"
            >
              <Trash2 className="w-4 h-4 mr-3 text-red-500" />
              <span className="font-medium">Delete</span>
            </button>
            
          </div>
          
)}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
            'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {task.priority.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.completed === true ? 'bg-green-100 text-green-700 border border-green-200' :
            task.completed === false ? 'bg-blue-100 text-blue-700 border border-blue-200' :
            'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">{new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="text-xs text-slate-500">Due date</p>
        </div>
      </div>
    </div>
    ))
  

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
  }

  return (
    <div onClick={()=>setActiveDropdown("")} className="space-y-6">
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
  )
}
export default Tasks;
