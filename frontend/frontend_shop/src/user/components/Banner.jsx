import React, { useEffect, useState } from 'react';
import { getBanners } from '../../api/bannerApi.js';
import Box from '../assets/icons/Vector.svg';
import Ship from '../assets/icons/delivery-truck.svg';
import Support from '../assets/icons/24-hours.svg';
import Secure from '../assets/icons/shield.svg';

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

// Khai báo modules
SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const result = await getBanners();
        console.log('Banners:', result);
        if (result?.status && Array.isArray(result.data)) {
          setBanners(result.data);
        }
      } catch (err) {
        console.error('Lỗi khi lấy banners:', err);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Swiper slider */}
      {banners.length > 0 && (
        <div className="w-full md:w-[90%] lg:w-[70%] h-[600px] mb-6">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="h-full w-full rounded-xl overflow-hidden"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Icon section */}
      <div className="bg-white shadow-md rounded-xl -mt-10 w-11/12 max-w-[1200px] flex flex-wrap justify-around p-6 text-center">
        <div>
          <img src={Box} alt="Khuyến mãi" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Khuyến Mãi</p>
          <p className="text-xs text-gray-500">Every week new sales</p>
        </div>
        <div>
          <img src={Ship} alt="Free shipping" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Miễn Phí Giao Hàng</p>
          <p className="text-xs text-gray-500">Cho đơn hàng từ 500k</p>
        </div>
        <div>
          <img src={Support} alt="Hỗ trợ 24/7" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Hỗ Trợ 24/7</p>
          <p className="text-xs text-gray-500">Liên hệ bất cứ lúc nào</p>
        </div>
        <div>
          <img src={Secure} alt="Thanh toán an toàn" className="mx-auto mb-2 w-8 h-8" />
          <p className="font-medium">Thanh Toán An Toàn</p>
          <p className="text-xs text-gray-500">100% bảo mật</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
