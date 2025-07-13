// frontend/src/components/ProductCard.js
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-6 bg-white">
      <img src={product.image} alt={product.name} className="w-full h-2/3 object-cover rounded-xl" />
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>
    </div>
  );
}
