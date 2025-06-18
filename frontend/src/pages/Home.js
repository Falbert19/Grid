import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const fetchMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
    }, 500);
  };

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
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const fetchMore = () => {
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
    }, 500);
  };

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
