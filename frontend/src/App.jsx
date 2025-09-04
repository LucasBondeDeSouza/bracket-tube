import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default () => {

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}