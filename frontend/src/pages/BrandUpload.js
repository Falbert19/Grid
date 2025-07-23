//frontend/src/pages/BrandUpload.js
import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export default function BrandUpload() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    sizes: "",
    colors: "",
    stock: ""
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/products`, {
        ...form,
        sizes: form.sizes.split(",").map(s => s.trim()),
        colors: form.colors.split(",").map(c => c.trim()),
        stock: parseInt(form.stock)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Product uploaded!");
      setForm({
        name: "", image: "", price: "", sizes: "", colors: "", stock: ""
      });
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-zinc-800 text-white rounded">
      <h2 className="text-2xl mb-4 font-bold">Upload Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Product name" className="p-2 bg-zinc-700 rounded" value={form.name} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" className="p-2 bg-zinc-700 rounded" value={form.image} onChange={handleChange} required />
        <input name="price" placeholder="Price" className="p-2 bg-zinc-700 rounded" value={form.price} onChange={handleChange} required />
        <input name="sizes" placeholder="Sizes (comma-separated)" className="p-2 bg-zinc-700 rounded" value={form.sizes} onChange={handleChange} />
        <input name="colors" placeholder="Colors (comma-separated)" className="p-2 bg-zinc-700 rounded" value={form.colors} onChange={handleChange} />
        <input name="stock" placeholder="Stock quantity" className="p-2 bg-zinc-700 rounded" value={form.stock} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Upload</button>
      </form>
      {message && <div className="mt-3 text-sm">{message}</div>}
    </div>
  );
}
