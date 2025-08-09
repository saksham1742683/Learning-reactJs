import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart  />} />
        <Route path="/payment" element={<Payment  />} />
      </Routes>
    </>
  );
}

export default App;
