import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchaseTable = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(false);
  const [purchasePage, setPurchasePage] = useState(true);
  const [designcodepage, setDesigncosdepage] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("/Admin/viewpurchase");
        if (Array.isArray(response.data.purchaseResult)) {
          setPurchases(response.data.purchaseResult);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Handler for viewing purchase details
  const handleViewDetails = async (Id) => {
    setSelectedPurchase(true);
    setPurchasePage(false);
    try {
      const response = await axios.get(`/Admin/viewpurchaseitems/${Id}`);
      if (Array.isArray(response.data.purchaseItemsResult)) {
        setSelectedPurchase(response.data.purchaseItemsResult);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  const handleClose = () => {
    setSelectedPurchase(false);
    setPurchasePage(true);
  };

  //Design code view

  const handleDesignCode = async () => {
    setDesigncosdepage(true);
    setPurchasePage(false);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg border mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        📋 Purchase Records
      </h2>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && purchasePage && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-3">Invoice Number</th>
                <th className="border p-3">Supplier Name</th>
                <th className="border p-3">Purchase Date</th>
                <th className="border p-3">Total Bill Amount (₹)</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length > 0 ? (
                purchases.map((purchase, index) => (
                  <tr
                    key={index}
                    className="text-center bg-white even:bg-gray-100 hover:bg-gray-50"
                  >
                    <td className="border p-3">{purchase.invoice_number}</td>
                    <td className="border p-3">{purchase.supplier_name}</td>
                    <td className="border p-3">
                      {new Date(purchase.purchase_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="border p-3 font-semibold">
                      {purchase.total_amount}
                    </td>
                    <td
                      className={`border p-3 font-semibold ${
                        purchase.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {purchase.status}
                    </td>
                    <td className="border p-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                        onClick={() => handleViewDetails(purchase.id)}
                      >
                        View Products
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border p-3 text-center text-gray-500"
                  >
                    No purchases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedPurchase && selectedPurchase.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Purchase Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border p-3">Item Name</th>
                  <th className="border p-3">Quantity</th>
                  <th className="border p-3">Price (₹)</th>
                  <th className="border p-3">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedPurchase.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center bg-white even:bg-gray-100"
                  >
                    <td className="border p-3">{item.item_name}</td>
                    <td className="border p-3">{item.quantity}</td>
                    <td className="border p-3">{item.price}</td>
                    <td className="border p-3">{item.total_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md gap-2 mr-2 cursor-pointer"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={handleDesignCode}
            >
              Add Design Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseTable;
