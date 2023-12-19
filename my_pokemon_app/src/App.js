<<<<<<< HEAD
import React from 'react';
import Main from './Components/Main';
import './Components/style.css'
function App() {
  return (
    <>
      <Main/>
    </>
=======
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Layout/Authorization/Login";
import Home from "./Layout/Home/Home";
import Register from "./Layout/Authorization/Register";
import Folder from "./Layout/Folder/Folder";
import UserPage from "./Layout/UserPage/UserPage";
import { auth } from "./api/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("localUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("localUser");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/user/:id"
        element={user ? <UserPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/folder/:id"
        element={user ? <Folder /> : <Navigate to="/login" replace />}
      />
    </Routes>
>>>>>>> fdc4ea01cb915923bbdc2fecb437e6a9a6c8fde1
  );
}

export default App;
