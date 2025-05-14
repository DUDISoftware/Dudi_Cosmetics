import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import SP1 from "../assets/images/sp1.png";
import SP2 from "../assets/images/sp2.png";
import SP3 from "../assets/images/sp3.png";
import SP4 from "../assets/images/sp4.png";

const proposalProduct = [
  {
    id: 1,
    name: "CHANEL. RED CAMELLIA EXPERT REVITALIZING SERUM DUO",
    price: 20,
    oldPrice: null,
    tag: "New",
    image: SP1,
  },
  {
    id: 2,
    name: "CHANEL. SERUM DUO",
    price: 20,
    oldPrice: 30,
    tag: "Sales",
    image: SP2,
  },
  {
    id: 3,
    name: "CHANEL. EXPERT REVITALIZING SERUM DUO",
    price: 20,
    tag: null,
    image: SP3,
  },
  {
    id: 4,
    name: "Library Stool Chair",
    price: 20,
    tag: null,
    image: SP4,
  },
  {
    id: 5,
    name: "Library Stool Chair",
    price: 70,
    tag: null,
    image: SP1,
  },
];

const ProposalProduct = () => {
  const [visibleProducts, setVisibleProducts] = useState(proposalProduct.slice(0, 4)); // Show first 4 products

  const scroll = (direction) => {
    if (direction === "right") {
      // Move the first product to the end
      setVisibleProducts((prevProducts) => [
        ...prevProducts.slice(1),
        proposalProduct[(proposalProduct.indexOf(prevProducts[prevProducts.length - 1]) + 1) % proposalProduct.length],
      ]);
    } else if (direction === "left") {
      // Move the last product to the front
      setVisibleProducts((prevProducts) => [
        proposalProduct[(proposalProduct.indexOf(prevProducts[0]) - 1 + proposalProduct.length) % proposalProduct.length],
        ...prevProducts.slice(0, -1),
      ]);
    }
  };

  return (
    <div className="w-full md:w-[70%] mx-auto px-4 md:px-0 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Đề Xuất Dành Cho Bạn</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-200 text-black rounded-full p-2 hover:bg-red-700 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-200 text-black rounded-full p-2 hover:bg-red-700 hover:text-white transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="relative  rounded-xl p-4 shadow hover:shadow-md transition-all"
          >
            {product.tag && (
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
                  product.tag === "New"
                    ? "bg-red-500 text-white"
                    : "bg-orange-300 text-black"
                }`}
              >
                {product.tag}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-sm font-medium line-clamp-2 overflow-hidden h-12">{product.name}</h3> {/* Enforcing 2 lines */}
            <div className="flex justify-between items-center mt-2">
              {/* Giới hạn giá tiền cố định */}
              <span className="text-red-500 font-bold">${product.price}</span>
              <div className="absolute bottom-4 right-4 flex gap-2 items-center">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-white transition">
                  <FaShoppingCart className="text-gray-600 hover:text-red-500" />
                </button>
              </div>
            </div>
            {/* Move FaHeart to the top-right corner */}
            <button className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-white transition">
              <FaHeart className="text-gray-600 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalProduct;
