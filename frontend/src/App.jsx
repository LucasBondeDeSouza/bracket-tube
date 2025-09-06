import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true

export default () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/users/profile")

      setUser(data)
    }

    axiosGet()
  }, [])

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <BrowserRouter>
        <Header user={user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  )
}