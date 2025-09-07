import React, { useState, useEffect } from 'react';
import { Plus, Search, Bell, Settings, User, Calendar, CheckCircle2, Circle, Clock, TrendingUp, Filter, MoreHorizontal } from 'lucide-react';
import SettingsPage from './SettingsPage';
import Dashboard from './Dashboard';
import Tasks from './Tasks';
// import UserDetails from './UserDetails';
const TaskManager = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [open, setOpen] = useState(false)

  const Sidebar = () => (
    <div className="w-64 bg-white/60 backdrop-blur-sm border-r border-slate-200/50 h-full p-6">
      <div className="w-full flex items-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">TaskFlow Pro</span>
      </div>
      
      <nav className="space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
          { id: 'tasks', label: 'All Tasks', icon: Circle },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'progress', label: 'Weekly Progress', icon: Clock }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all ${
              currentView === item.id 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                : 'text-slate-700 hover:bg-slate-100/50'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  const Header = () => (
    <header className="w-full bg-white/60 backdrop-blur-sm border-b border-slate-200/50 px-8 py-4">
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{currentView}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={()=> setOpen(true)}>
            <Settings className="w-5 h-5" />
          </button>
          
          

        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      // case 'progress':
        // return <WeeklyProgress />;
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <Tasks/>
        

      }          
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex w-full h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-8">
            {renderContent()}
          </main>
        </div>
      </div>
      {open &&<SettingsPage open={open} onClose={() => setOpen(false)} />}
    </div>
  );
};


export default TaskManager;