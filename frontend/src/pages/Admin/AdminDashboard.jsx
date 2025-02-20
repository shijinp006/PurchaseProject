import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaClipboardList,
  FaChartBar,
  FaBox,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white shadow-lg transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <h2 className="text-xl font-bold">Vyapar Admin</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-white text-2xl focus:outline-none md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-4 space-y-2">
          <Link
            to="/purchase"
            className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition"
          >
            <FaShoppingCart className="mr-3" /> Create Purchase
          </Link>
          <Link
            to="/viewpurchase"
            className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition"
          >
            <FaClipboardList className="mr-3" /> Purchases List
          </Link>
          <Link
            to="/additems"
            className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition"
          >
            <FaBox className="mr-3" /> Add Items
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 w-full md:ml-64">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden text-blue-900 text-2xl mb-4"
        >
          <FaBars />
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Purchase Section */}
        <div className="bg-white p-6 shadow-md rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📦 Purchase Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/purchase/details"
              className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-center transition"
            >
              🔍 View Details
            </Link>
            <Link
              to="/purchase/design"
              className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-center transition"
            >
              🎨 Create Design Code
            </Link>
            <Link
              to="/purchase/edit"
              className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg text-center transition"
            >
              ✏️ Edit
            </Link>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📊 Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-yellow-100 text-yellow-800 text-center rounded-lg shadow">
              🟡 IN PROGRESS
            </div>
            <div className="p-4 bg-red-100 text-red-800 text-center rounded-lg shadow">
              🔴 OUTDATED
            </div>
            <div className="p-4 bg-green-100 text-green-800 text-center rounded-lg shadow">
              ✅ COMPLETED
            </div>
            <div className="p-4 bg-blue-100 text-blue-800 text-center rounded-lg shadow">
              📦 TOTAL STOCK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
