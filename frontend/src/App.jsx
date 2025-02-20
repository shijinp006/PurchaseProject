import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/Admin/AdminLoginTemplete";
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Example additional page
import PurchaseForm from "./pages/Admin/PurchaseTemplate";
import AddItemForm from "./pages/Admin/AddItemsTemplet";
import ViewPurchaseDetails from "./pages/Admin/ViewPurchaseDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/purchase" element={<PurchaseForm />} />
        <Route path="/additems" element={<AddItemForm />} />
        <Route path="/viewpurchase" element={<ViewPurchaseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
