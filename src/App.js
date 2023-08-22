import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Register from "./Components/Register";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Sass/main.scss";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    async function login() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const login = await signInWithEmailAndPassword(
        auth,
        user.username,
        user.password
      );
      console.log(login);
      setUser(login);
    }
    login();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
