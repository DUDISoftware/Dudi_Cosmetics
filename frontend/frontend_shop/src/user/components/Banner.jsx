import React from 'react';
import BannerImg from '../assets/images/banner.png';
import Box from '../assets/icons/Vector.svg';
import Ship from '../assets/icons/delivery-truck.svg';
import Support from '../assets/icons/24-hours.svg';
import Secure from '../assets/icons/shield.svg';
const Banner = () => {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className="w-[70%] h-[600px] bg-cover bg-center "
        style={{ backgroundImage: `url(${BannerImg})` }}
      >
      </div>
      <div className="bg-white shadow-md rounded-xl -mt-10 w-11/12 max-w-[1200px] flex flex-wrap justify-around p-6 text-center">
        <div>
          <img src={Box} alt="Khuyến mãi" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Khuyến Mãi</p>
          <p className="text-xs text-gray-500">Every week new sales</p>
        </div>
        <div>
          <img src={Ship} alt="Free shipping" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Miễn Phí Vận Chuyển</p>
          <p className="text-xs text-gray-500">100% Free for all orders</p>
        </div>
        <div>
          <img src={Support} alt="Hỗ trợ" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Hỗ Trợ 24/7</p>
          <p className="text-xs text-gray-500">We care your experiences</p>
        </div>
        <div>
          <img src={Secure} alt="Thanh toán uy tín" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Thanh Toán Uy Tín</p>
          <p className="text-xs text-gray-500">100% Secure Payment Method</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6 mb-10">
        <button className="px-6 py-2 bg-black text-white rounded-full">Xem Tất Cả</button>
        <button className="px-6 py-2 border rounded-full">Quà tặng</button>
        <button className="px-6 py-2 border rounded-full">Mã Giảm Giá</button>
      </div>
    </div>
  );
};

export default Banner;
