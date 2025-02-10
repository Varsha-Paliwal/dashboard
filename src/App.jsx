import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./all.css";
import Dashboard from "./components/Dashboard";
import ProductsList from "./components/AddProducts";
import About from "./components/About";
import Customers from "./components/Customers";
import Notifications from "./components/Notifications";
import Logout from "./components/Logout";
import Settings from "./components/Settings";
import CustomNavbar from "./components/CustomNavbar";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <div className="">
          <CustomNavbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/about" element={<About />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
};

export default App;
