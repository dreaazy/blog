import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {SignUp, SignIn, Home} from "./pages";

import { ProtectedRoute } from "./components";


export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            
            <Route path="/" element={<ProtectedRoute element={<Home/>} />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            {/* 
            <Route path="/contact" element={<Contact />} />
            */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}
