import React, { useState } from "react";
import {
  Menu,
  ShoppingCart,
  Heart,
  User,
  Search,
  InfoIcon,
  ChevronRight,
  Delete,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const categories = [
    { name: "Sức Khỏe-Làm Đẹp", subCategories: ["Chăm sóc da mặt", "Chăm sóc tóc và da đầu"] },
    { name: "Mỹ Phẩm High-End", subCategories: [] },
    { name: "Chăm sóc cơ thể", subCategories: [] },
    { name: "Nước hoa", subCategories: [] },
    { name: "Thực phẩm chức năng", subCategories: [] },
    { name: "Hasaki Clinic & Spa", subCategories: [] },
    { name: "DermaHair", subCategories: ["Sản phẩm đặc biệt"] },
  ];

  const isLoggedIn = localStorage.getItem("token") !== null; // Kiểm tra xem người dùng đã đăng nhập hay chưa

  const handleUserClick = () => {
    if (isLoggedIn) {
      const role = localStorage.getItem("role"); // Lấy role từ localStorage
      if (role === "user") {
        // Nếu là người dùng, chuyển tới trang profile
        navigate("/profile");
      } else {
        // Nếu là admin hoặc không phải là user, chuyển tới trang khác (tuỳ ý)
        navigate("/admin");
      }
    } else {
      // Nếu chưa đăng nhập, chuyển tới trang login
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-gray-400 text-white text-sm py-1 px-4 flex justify-end items-center space-x-4">
        <div className="w-[70%] mx-auto flex justify-end items-center space-x-4">
          <span className="mr-auto">Miễn Phí Ship</span>
          <select className="bg-gray-400 text-white text-sm focus:outline-none">
            <option value="vn">VN</option>
            <option value="en">EN</option>
          </select>
          <span className="flex items-center space-x-1">
            <InfoIcon className="w-4 h-4" />
            <span>Giúp đỡ</span>
          </span>
        </div>
      </div>
      <header className="border-b">
        <div className="w-[75%] mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-red-600 font-bold text-xl">DUDI Cosmetics</a>
            </div>

            <div className="flex items-center space-x-4 text-gray-800 relative">
              <div className="relative flex items-center space-x-1">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs">Giỏ Hàng</span>
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1 rounded-full">
                  2
                </span>
              </div>
              <Heart className="w-5 h-5 hover:text-red-600" />
              <User
                className="w-5 h-5 hover:text-red-600 cursor-pointer"
                onClick={handleUserClick} // Khi click vào user icon, gọi handleUserClick
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-5">
              <button
                onClick={toggleMenu}
                className="flex items-center border rounded px-3 py-1 text-sm hover:bg-gray-100"
              >
                <Menu className="w-4 h-4 mr-1" />
                Danh Mục
              </button>

              <nav className="hidden lg:flex space-x-5 text-sm">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }
                >
                  Trang Chủ
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }
                >
                  Sản Phẩm
                </NavLink>
                <NavLink
                  to="/news"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }
                >
                  Tin Tức
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }
                >
                  Liên Hệ
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }
                >
                  Giới Thiệu
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center group border rounded px-2 py-1 transition-all duration-300">
              <Search className="w-5 h-5 text-gray-800 group-hover:text-red-600" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="ml-2 w-0 opacity-0 group-hover:w-40 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-[250px] h-full bg-white shadow-lg transition-all duration-300 z-20`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-600">
            <Delete />
          </button>
        </div>
        <div className="px-4 py-2">
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li key={index}>
                <div
                  onClick={() =>
                    category.subCategories.length > 0 && toggleSubMenu(index)
                  }
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{category.name}</span>
                  {category.subCategories.length > 0 && (
                    <ChevronRight
                      className={`w-4 h-4 ${openSubMenu === index ? "rotate-90" : ""} transition-transform`}
                    />
                  )}
                </div>
                {category.subCategories.length > 0 && openSubMenu === index && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {category.subCategories.map((subCategory, subIndex) => (
                      <li key={subIndex}>
                        <a href="#" className="text-gray-600 hover:text-red-600">
                          {subCategory}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Header;
