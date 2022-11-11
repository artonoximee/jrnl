import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./components/Login";
import Create from "./components/Create";
import Read from "./components/Read";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route exact path="/create" element={ <PrivateRoute><Create /></PrivateRoute> } />
            <Route exact path="/read" element={ <PrivateRoute><Read /></PrivateRoute> } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
