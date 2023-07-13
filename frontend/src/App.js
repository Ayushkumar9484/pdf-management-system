import React from "react";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom"
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import UserContext from './componenets/Usercontext'
function App() {
  return (
    <>
      <UserContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </UserContext>
    </>
  );
}

export default App;
