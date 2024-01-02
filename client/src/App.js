import React from "react";
import Register from "./pages/Register/Register.jsx";
import Login from './pages/Login/Login.jsx';
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addjob" element={<h1>Add Job Page</h1>} />
        <Route path="/job-posts" element={<h1>HomePage</h1>} />
        <Route path="/job-detail" element={<h1>Job Detail Page</h1>} />
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/*" element={<h2>404! Page not Found!!</h2>} />
      </Routes>
    </div>
  );
}

export default App;
