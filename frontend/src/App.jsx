import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

import { UserContextProvider } from "./context/UserContext";

import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true

export default () => {

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <UserContextProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

      <ToastContainer />
    </div>
  )
}