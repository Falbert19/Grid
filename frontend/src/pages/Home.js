// frontend/src/pages/Home.js
import React, { useState, useEffect } from "react";
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
        console.error(" Axios error:", err.message);
        setError("Failed to load products. Please try again.");
      });
  }, []);

  const fetchMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
    }, 500);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={visibleCount}
      next={fetchMore}
      hasMore={visibleCount < products.length}
      loader={
        <h4 className="text-center text-gray-500 py-4">Loading more...</h4>
      }
    >
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {products.slice(0, visibleCount).map((product) => (
          <div key={product._id} className="snap-start h-screen">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
