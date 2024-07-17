import { useState } from "react";
import { Button } from "antd";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="web-container">
      <Header />

      <div className="main-content">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
