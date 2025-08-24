import {CheckCircle2 } from 'lucide-react';
import { useState } from "react";
import { login, signup } from "../api";

export default function Signup() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const handleSignup = async () => {
        try {
          const res:any=await signup(email, password);
          if(res.status!==200||res.status!==201){
            throw new Error("Signup failed");
          }
          alert("Signup successful ✅");
          window.location.href = "/"; // redirect to home
        } catch (err: any) {
          setError(`Invalid details`);
        }
      };
      
    return(
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-1000 to-indigo-800 flex items-center justify-center p-8">

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-2xl">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">TaskFlow Pro</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Professional task management platform designed for high-performing teams and individuals.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-slate-700">Advanced project tracking & analytics</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-slate-700">Real-time collaboration tools</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-slate-700">Enterprise-grade security</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to your TaskFlow Pro account</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              onClick={() => handleSignup()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg"
            >
              Sign up to Dashboard
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          
          
        </div>
      </div>
    </div>
  );
}
