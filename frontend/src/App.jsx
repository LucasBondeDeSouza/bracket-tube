import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import axios from "axios"

import { UserContextProvider } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTournament from "./pages/CreateTournament";
import Profile from "./pages/Profile";
import Tournament from "./pages/Tournament";
import Play from "./pages/Play";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true

export default () => {

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-tournament/:tournament_id?" element={<CreateTournament />} />
            <Route path="/tournament/:tournament_id" element={<Tournament />} />
            <Route path="/tournament/:tournament_id/play" element={<Play />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

      <ToastContainer />
    </div>
  )
}