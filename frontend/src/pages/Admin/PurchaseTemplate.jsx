import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseForm = () => {
  const [purchase, setPurchase] = useState({
    supplier_name: "",
    purchase_date: "",
    items: [{ item_name: "", quantity: "", unit_price: "" }],
    total_amount: 0,
    status: "Pending",
  });

  // Dynamically calculate total amount
  useEffect(() => {
    const total = purchase.items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.unit_price),
      0
    );
    setPurchase((prev) => ({ ...prev, total_amount: total }));
  }, [purchase.items]);

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...purchase.items];
    newItems[index][name] = value;
    setPurchase({ ...purchase, items: newItems });
  };

  const addItem = () => {
    setPurchase({
      ...purchase,
      items: [
        ...purchase.items,
        { item_name: "", quantity: "", unit_price: "" },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = purchase.items.filter((_, i) => i !== index);
    setPurchase({ ...purchase, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/Admin/addpurchase", purchase);
      alert("Purchase added successfully!");
      setPurchase({
        supplier_name: "",
        purchase_date: "",
        items: [{ item_name: "", quantity: "", unit_price: "" }],
        total_amount: 0,
        status: "Pending",
      });
    } catch (error) {
      console.error("Error adding purchase:", error);
      alert("Failed to add purchase.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-xl rounded-lg border">
      <h2 className="text-3xl font-bold mb-6 text-center">🧾 Invoice Bill</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              value={purchase.supplier_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Purchase Date</label>
            <input
              type="date"
              name="purchase_date"
              value={purchase.purchase_date}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Items Section */}
        <h3 className="text-xl font-semibold mt-4">📦 Purchased Items</h3>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-100">
          {purchase.items.map((item, index) => (
            <div key={index} className="p-4 mb-2 border rounded-lg bg-white">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  name="item_name"
                  placeholder="Item Name"
                  value={item.item_name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  required
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  required
                />
                <input
                  type="text"
                  name="unit_price"
                  placeholder="Unit Price (₹)"
                  value={item.unit_price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  required
                />
              </div>
              {purchase.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="mt-2 text-red-600 text-sm"
                >
                  ❌ Remove Item
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <button
          type="button"
          onClick={addItem}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          ➕ Add Item
        </button>

        {/* Total Amount */}
        <div className="text-right text-lg font-semibold border-t pt-4">
          Total: ₹{purchase.total_amount.toFixed(2)}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md text-lg"
        >
          ✅ Save Invoice
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
