// frontend/src/components/ProductCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export default function ProductCard({ product }) {
  const [popup, setPopup] = useState("");
  const [token, setToken] = useState(null);
  const [saved, setSaved] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 2000);
  };

  const toggleItem = async (actionType) => {
    if (!token) {
      showPopup("You must be logged in.");
      return;
    }

    const action = actionType === "save" ? saved : inCart ? "remove" : actionType;
    const url = `${API_URL}/api/user/${actionType === "save" ? (saved ? "unsave" : "save") : inCart ? "remove-cart" : "cart"}/${product._id}`;

    try {
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (actionType === "save") {
        setSaved(!saved);
        showPopup(saved ? "Item removed from favorites" : "Item saved to favorites");
      } else {
        setInCart(!inCart);
        showPopup(inCart ? "Item removed from cart" : "Item added to cart");
      }
    } catch (err) {
      console.error(err);
      showPopup("Error, try again.");
    }
  };

  return (
    <div className="relative p-4">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <p className="text-sm">Sizes: {product.sizes.join(", ")}</p>
      <p className="text-sm mb-2">Colors: {product.colors.join(", ")}</p>

      {token && (
        <div className="flex gap-4">
          <button
            onClick={() => toggleItem("save")}
            className={`px-4 py-1 ${saved ? "bg-gray-600" : "bg-blue-500"} text-white rounded hover:opacity-90`}
          >
            {saved ? "Unsave" : "Save"}
          </button>
          <button
            onClick={() => toggleItem("cart")}
            className={`px-4 py-1 ${inCart ? "bg-gray-600" : "bg-green-500"} text-white rounded hover:opacity-90`}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      )}

      {popup && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow">
          {popup}
        </div>
      )}
    </div>
  );
}
