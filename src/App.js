import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import JrnlForm from "./components/JrnlForm";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route exact path="/create" element={ <JrnlForm /> } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
