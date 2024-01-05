import React from "react";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import AddJob from "./pages/Addjob/AddJob.jsx";
import Home from "./pages/Home/Home.jsx";
import JobDetail from "./pages/Job-Detail/JobDetail.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job-posts" element={<Home />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<h2>404! Page not Found!!</h2>} />
      </Routes>
    </div>
  );
}

export default App;
