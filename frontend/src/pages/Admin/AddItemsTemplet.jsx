import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddItemForm = () => {
  const [item, setItem] = useState({
    item_name: "",
    quantity: "0",
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.item_name || !item.quantity) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }
    try {
      await axios.post("/Admin/additems", item);
      Swal.fire("Success", "Item added successfully!", "success");
      setItem({ item_name: "", quantity: "0" });
    } catch (error) {
      Swal.fire("Error", "Failed to add item", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          ➕ Add New Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-semibold">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              value={item.item_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={item.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
          >
            ✅ Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
