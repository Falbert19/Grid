//Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("💥 Axios error:", err.message);
        setError("Failed to load products. Please try again.");
        if (err.response) {
          console.log("📦 Response error:", err.response.data);
        } else if (err.request) {
          console.log("📡 No response received:", err.request);
        } else {
          console.log("❌ Request config error:", err.message);
        }
      });
  }, []);

  const fetchMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
    }, 500);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        {error}
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={visibleCount}
      next={fetchMore}
      hasMore={visibleCount < products.length}
      loader={<h4 className="text-center text-gray-500 py-4">Loading more...</h4>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
