// frontend/src/components/ProductCard.js
import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export default function ProductCard({ product }) {
  const [popup, setPopup] = useState("");

  const token = localStorage.getItem("token");

  const handleAction = async (action) => {
    try {
      const url = `${API_URL}/api/user/${action}/${product._id}`;
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPopup(`Item ${action === "save" ? "saved to favorites" : "added to cart"}`);
      setTimeout(() => setPopup(""), 2000);
    } catch (err) {
      console.error(`Failed to ${action}:`, err);
      setPopup("You must be logged in.");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <div className="relative p-4">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <p className="text-sm">Sizes: {product.sizes.join(", ")}</p>
      <p className="text-sm mb-2">Colors: {product.colors.join(", ")}</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleAction("save")}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => handleAction("cart")}
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>

      {popup && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow">
          {popup}
        </div>
      )}
    </div>
  );
}