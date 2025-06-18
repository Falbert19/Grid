// frontend/src/components/ProductCard.js
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">${product.price}</p>
      <p className="text-xs text-gray-400 mt-1">{product.brand?.name}</p>
    </div>
  );
}
