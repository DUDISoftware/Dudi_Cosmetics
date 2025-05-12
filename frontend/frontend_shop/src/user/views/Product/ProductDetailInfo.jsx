import React from "react";
import { FaStar, FaTruck, FaMapMarkerAlt, FaCartPlus, FaHeart } from "react-icons/fa";
import SP1 from "../../assets/images/SP1.png";
import SP2 from "../../assets/images/SP2.png";
import SP3 from "../../assets/images/SP3.png";
import SP4 from "../../assets/images/SP4.png";

const ProductDetailInfo = () => {
  return (
    <div className="w-[75%] mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 text-[#333] font-[Arial]">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <img
          src={SP1}
          alt="Product"
          className="w-full h-auto object-contain rounded-xl border mb-4"
        />
        <div className="grid grid-cols-4 gap-2">
          {[SP1, SP2, SP3, SP4].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className="w-full border-[2px] border-gray-300 p-1 rounded-md hover:border-red-500 cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="text-sm">
        <h2 className="text-xl font-semibold uppercase leading-snug mb-3">
          N°1 DE CHANEL. RED CAMELLIA EXPERT REVITALIZING SERUM DUO
        </h2>
        <p className="text-[#d0021b] text-2xl font-bold mb-2">6.490.000 VND</p>

        <div className="flex items-center text-yellow-500 mb-2 text-base">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="mr-1" />
          ))}
          <span className="text-black ml-2 mr-2">121 Đánh Giá</span> |
          <span className="ml-2 text-black">140 Đã Bán</span>
        </div>

        <div className="flex items-center mb-2 text-sm">
          <FaHeart className="text-red-500 mr-2" />
          <span className="text-black">Đã Thích (265)</span>
        </div>

        <div className="flex items-center mb-2">
          <FaTruck className="text-gray-600 mr-2" />
          <span className="font-medium text-black">Vận Chuyển:</span>
          <span className="ml-2">Miễn phí vận chuyển</span>
        </div>

        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-600 mr-2" />
          <span className="font-medium text-black">Gửi từ:</span>
          <span className="ml-2">TP Hồ Chí Minh</span>
        </div>

        <div className="flex items-center mb-4">
          <span className="font-medium text-black mr-2">Số Lượng:</span>
          <div className="flex items-center border rounded overflow-hidden">
            <button className="px-3 py-1 border-r">-</button>
            <span className="px-4">1</span>
            <button className="px-3 py-1 border-l">+</button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button className="bg-[#fce4e4] text-[#d0021b] border border-[#d0021b] px-6 py-2 rounded-full text-sm hover:opacity-90 transition-all">
            MUA NGAY
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-100">
            <FaCartPlus />
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>

        <div className="border-t border-b py-4 text-sm leading-relaxed">
          <div className="grid grid-cols-2 gap-y-2">
            <p><strong>Danh Mục:</strong> Serum</p>
            <p><strong>Kho:</strong> 233</p>
            <p><strong>Thương Hiệu:</strong> Chanel</p>
            <p><strong>Gửi Từ:</strong> TP Hồ Chí Minh</p>
          </div>
        </div>

        <div className="mt-6 text-sm">
          <h3 className="font-bold text-base mb-2 uppercase text-black">Mô Tả Sản Phẩm</h3>
          <p>
            Bộ Đôi Tinh Chất Chuyên Biệt Dành Cho Mặt Và Vùng Mắt. Với thành phần chiết xuất từ
            hoa trà đỏ, giúp giảm dấu hiệu lão hóa và chống oxy hóa. Tinh chất vùng mắt giảm
            nếp nhăn, thâm quầng, bọng mắt hiệu quả.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
