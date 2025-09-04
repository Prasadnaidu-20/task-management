import React from 'react'
import { useState } from 'react';
import { Plus,Filter,MoreHorizontal } from 'lucide-react';

function Dashboard() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete project proposal', priority: 'high', status: 'pending', dueDate: '2025-08-22', category: 'Work' },      
    ]);
      
  return (
    <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Tasks</h3>
                <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">In Progress</h3>
                <p className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">Pending</h3>
                <p className="text-2xl font-bold text-orange-600">{tasks.filter(t => t.status === 'pending').length}</p>
              </div>
            </div>

           
            
        </div>
        );
    
}

export default Dashboard