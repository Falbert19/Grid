//frontend/src/pages/BrandUpload.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

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

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!imageFile) return setMessage("Please upload an image.");

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("sizes", form.sizes);
  formData.append("colors", form.colors);
  formData.append("stock", form.stock);

  try {
    await axios.post(`${API_URL}/api/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    setMessage(" Product uploaded!");
    setForm({ name: "", image: "", price: "", sizes: "", colors: "", stock: "" });
    setImageFile(null);
  } catch (err) {
    console.error(err);
    setMessage("Upload failed.");
  }
};

  return (
    <div className="max-w-xl mx-auto p-4 bg-zinc-800 text-white rounded">
      <h2 className="text-2xl mb-4 font-bold">Upload Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-500 rounded p-4 text-center bg-zinc-700 cursor-pointer"
        >
          <input {...getInputProps()} />
          {imageFile ? (
            <p>{imageFile.name}</p>
          ) : isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Click or drag image to upload</p>
          )}
        </div>

        <input name="name" placeholder="Product name" className="p-2 bg-zinc-700 rounded" value={form.name} onChange={handleChange} required />
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
