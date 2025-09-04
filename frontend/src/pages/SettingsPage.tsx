import React, { useState ,useEffect} from 'react';
import { User, Settings, Bell, Shield, Moon, Globe, LogOut, Edit3 } from 'lucide-react';
import axios from 'axios';


interface SettingsItem {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value: boolean | string;
  options?: string[];
}


export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // assuming you saved JWT at login
    if (token) {
      axios
        .get("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
    }
  }, []);

  const [settings, setSettings] = useState<SettingsItem[]>([
    {
      id: 'notifications',
      label: 'Push Notifications',
      description: 'Receive notifications about updates and messages',
      type: 'toggle',
      value: true
    },
    {
      id: 'darkMode',
      label: 'Dark Mode',
      description: 'Use dark theme for better viewing in low light',
      type: 'toggle',
      value: false
    },
    {
      id: 'language',
      label: 'Language',
      description: 'Choose your preferred language',
      type: 'select',
      value: 'English',
      options: ['English', 'Spanish', 'French', 'German', 'Chinese']
    },
    {
      id: 'privacy',
      label: 'Profile Privacy',
      description: 'Control who can see your profile information',
      type: 'select',
      value: 'Friends Only',
      options: ['Public', 'Friends Only', 'Private']
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSettingChange = (id: string, value: boolean | string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    alert('Logout functionality would be implemented here');
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.email}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-gray-600 mb-1">{user.email}</p>
                  <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {user.plan} Plan
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
            </div>
            
            <div className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{setting.label}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  
                  <div className="ml-6">
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleSettingChange(setting.id, !setting.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          setting.value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    
                    {setting.type === 'select' && (
                      <select
                        value={setting.value as string}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {setting.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Change Password</h3>
                <p className="text-sm text-gray-500">Update your account password</p>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Privacy Settings</h3>
                <p className="text-sm text-gray-500">Control your data and privacy preferences</p>
              </button>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Account Management</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Subscription Plan</h3>
                <p className="text-sm text-gray-500">Manage your current plan and billing</p>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Download Data</h3>
                <p className="text-sm text-gray-500">Export your account data</p>
              </button>
              
              <button className="w-full text-left p-4 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-red-600">
                <h3 className="font-medium mb-1">Delete Account</h3>
                <p className="text-sm text-red-500">Permanently delete your account and all data</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

