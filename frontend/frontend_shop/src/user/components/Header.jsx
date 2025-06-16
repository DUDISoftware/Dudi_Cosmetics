import React, { useEffect, useState } from "react";
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
import { NavLink, useNavigate, Link } from "react-router-dom";
import { getPCParents } from "../../api/pcParentApi";
import { getPCChilds } from "../../api/pcChildApi";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const parentsResponse = await getPCParents(token);
        const parents = parentsResponse.data || parentsResponse;
        if (!Array.isArray(parents)) throw new Error("Parents should be an array");

        const childsResponse = await getPCChilds(token);
        const childs = childsResponse.data || childsResponse;
        if (!Array.isArray(childs)) throw new Error("Childs should be an array");

        const categoriesWithChildren = parents.map((parent) => ({
          ...parent,
          subCategories: childs.filter(
            (child) =>
              child.parent_id === parent._id || child.parent_id === String(parent._id)
          ),
        }));

        setCategories(categoriesWithChildren);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleUserClick = () => {
    const role = localStorage.getItem("role");
    if (token) {
      navigate(role === "user" ? "/profile" : "/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Top bar */}
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

      {/* Main header */}
      <header className="border-b">
        <div className="w-[75%] mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a href="/" className="text-red-600 font-bold text-xl">
              DUDI Cosmetics
            </a>

            <div className="flex items-center space-x-4 text-gray-800 relative">
              <div className="relative flex items-center space-x-1">
                <ShoppingCart className="w-5 h-5" />
                <Link to="/cart" className="hover:text-red-500"> Giỏ hàng</Link>
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1 rounded-full">
                  2
                </span>
              </div>
              <Heart className="w-5 h-5 hover:text-red-600 cursor-pointer" />
              <User
                className="w-5 h-5 hover:text-red-600 cursor-pointer"
                onClick={handleUserClick}
              />
            </div>
          </div>

          {/* Nav and Search */}
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
                {["/", "/products", "/posts", "/contact", "/about"].map((path, i) => {
                  const labels = ["Trang Chủ", "Sản Phẩm", "Tin Tức", "Liên Hệ", "Giới Thiệu"];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                      }
                    >
                      {labels[i]}
                    </NavLink>
                  );
                })}
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-white shadow-lg transition-transform duration-300 z-20 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-600">
            <Delete />
          </button>
        </div>

        <div className="px-4 py-2 overflow-y-auto h-[calc(100%-64px)]">
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li key={category._id}>
                <div
                  onClick={() =>
                    category.subCategories?.length > 0 && toggleSubMenu(index)
                  }
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <span>{category.category_name}</span>
                  {category.subCategories?.length > 0 && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        openSubMenu === index ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
                {category.subCategories?.length > 0 && openSubMenu === index && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {category.subCategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/category?category=${sub._id}`}
                          className="text-gray-600 hover:text-red-600 block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Header;
