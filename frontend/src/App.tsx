import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginScreen from "./pages/LoginScreen";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        {/* <Route path="/history" element={<History />} />
        <Route path="/task" element={<TaskManager/>} />*/}
        <Route path = "/" element = {<LoginScreen/>}/> 
        <Route path="/Home" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    
  );
}
