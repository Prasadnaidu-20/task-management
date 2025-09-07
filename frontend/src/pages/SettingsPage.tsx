import { useState, useEffect } from "react"
import {User,Bell,Settings} from "lucide-react"

interface SettingsProps {
  open: boolean
  onClose: () => void
}

export default function SettingsPage({ open, onClose }: SettingsProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [showProfile,setShowProfile] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const email = localStorage.getItem("userEmail")

    if (name && email) {
      setUser({ name, email })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    window.location.href = "/" // redirect after logout
  }

  return (
    <>
      {showProfile?(
        <div>
          <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      ></div>
      
      {/* Dropdown card positioned from top-right */}
      <div className="fixed top-16 right-8 z-50 w-80">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
                <p className="text-blue-100 text-sm">TaskFlow Pro</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {user ? (
              <>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Role</p>
                      <p className="text-sm font-medium text-slate-800">Pro User</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Status</p>
                      <p className="text-sm font-medium text-green-600">Active</p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">No user details found</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>):(
        <div>
          <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      ></div>
      
      {/* Dropdown card positioned from top-right */}
      <div className="fixed top-16 right-8 z-50 w-80">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Account Settings</h3>
                <p className="text-blue-100 text-sm">TaskFlow Pro</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {user ? (
              <>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Role</p>
                      <p className="text-sm font-medium text-slate-800">Pro User</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Status</p>
                      <p className="text-sm font-medium text-green-600">Active</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full flex items-center px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors">
                    <Settings className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-slate-700 font-medium">Account Preferences</span>
                  </button>
                  
                  <button className="w-full flex items-center px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors">
                    <Bell className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-slate-700 font-medium">Notifications</span>
                  </button>
                  
                  <button onClick={()=>setShowProfile(true)} className="w-full flex items-center px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors">
                    <User className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-slate-700 font-medium">Profile Settings</span>
                  </button>
                </div>

                <hr className="border-slate-200" />

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">No user details found</p>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>)}
      
    </>
  )
}

