// frontend/src/components/ProductCard.js
import React from "react";

export default function ProductCard({ product }) {
  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedItems")) || [];
    const isAlreadySaved = saved.some((p) => p._id === product._id);
    if (!isAlreadySaved) {
      localStorage.setItem("savedItems", JSON.stringify([...saved, product]));
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isAlreadyInCart = cart.some((p) => p._id === product._id);
    if (!isAlreadyInCart) {
      localStorage.setItem("cartItems", JSON.stringify([...cart, product]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <img src={product.image} alt={product.name} className="h-64 object-cover mb-4 rounded" />
      <h2 className="text-xl font-bold mb-1">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>

      <div className="text-sm text-gray-700 mt-2">
        <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
        <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">
          Save
        </button>
        <button onClick={handleAddToCart} className="px-3 py-1 bg-green-600 text-white rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}