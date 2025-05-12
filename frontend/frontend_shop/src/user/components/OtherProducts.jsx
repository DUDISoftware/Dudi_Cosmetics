import { useState } from 'react';
import React from 'react';
import Gucci1 from '../assets/images/product/gucci1.png';
import Gucci2 from '../assets/images/product/gucci2.png';
import Gucci3 from '../assets/images/product/gucci3.png';
import Gucci4 from '../assets/images/product/gucci4.png';
import Gucci5 from '../assets/images/product/gucci5.png';
import Gucci6 from '../assets/images/product/gucci6.png';
import Gucci7 from '../assets/images/product/gucci7.png';
import Gucci8 from '../assets/images/product/gucci8.png';
import { FaShoppingCart } from 'react-icons/fa';
const tabs = ['Tất Cả', 'Mới Nhất', 'Thịnh Hành', 'Tốt Nhất', 'Đặc Biệt'];

const products = [
  {
    id: 1,
    name: 'Gucci Guilty Pour Femme Shower',
    price: 20,
    image: Gucci1,
    tag: 'New',
  },
  {
    id: 2,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci2,
    tag: 'Sale',
  },
  {
    id: 3,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci3,
    tag: '',
  },
  {
    id: 4,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci4,
    tag: '',
  },
  {
    id: 5,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci5,
    tag: '',
  },
  {
    id: 6,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci6,
    tag: '',
  },
  {
    id: 7,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci7,
    tag: '',
  },
  {
    id: 8,
    name: 'Gucci Mémoire D Une Odeur I',
    price: 20,
    image: Gucci8,
    tag: '',
  },
];

export default function OtherProducts() {
  const [activeTab, setActiveTab] = useState('Tất Cả');

  return (
    <div className="w-full md:w-[70%] mx-auto px-4 md:px-0 mt-10">
      <h2 className="text-center text-2xl font-semibold mb-4">Sản Phẩm Khác</h2>
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative rounded-xl p-3 shadow hover:shadow-md">
            {product.tag && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.tag}
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
            <h3 className="text-sm font-medium">{product.name}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-red-500 font-bold">${product.price}</span>
              <button className="p-1 rounded-full bg-gray-100 hover:bg-red-700 ">
                <FaShoppingCart className="text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
