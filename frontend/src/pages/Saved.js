// frontend/src/pages/Saved.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export default function Saved() {
  const [savedItems, setSavedItems] = useState([]);
  const [popup, setPopup] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_URL}/api/user/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSavedItems(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load saved items");
      });
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/user/unsave/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedItems((prev) => prev.filter((item) => item._id !== productId));
      setPopup("Removed from saved items");
      setTimeout(() => setPopup(""), 2000);
    } catch (err) {
      console.error(err);
      setPopup("Failed to remove item");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  if (!token) {
    return <div className="text-center mt-10">Please log in to view saved items.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Saved Items</h2>

      {error && <p className="text-red-500">{error}</p>}

      {savedItems.length === 0 ? (
        <p className="text-gray-500">No saved items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => (
            <div key={item._id} className="border rounded p-4 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-700">${item.price}</p>
              <p className="text-sm">Sizes: {item.sizes.join(", ")}</p>
              <p className="text-sm mb-2">Colors: {item.colors.join(", ")}</p>
              <button
                onClick={() => handleRemove(item._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {popup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow z-50">
          {popup}
        </div>
      )}
    </div>
  );
}
