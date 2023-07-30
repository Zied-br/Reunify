import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <div className="Basic-container">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
