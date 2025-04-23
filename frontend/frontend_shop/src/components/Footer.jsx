import { Mail, Phone, MapPin, Home } from "lucide-react";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitterSquare } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-6 md:px-16 border-t leading-relaxed">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên Hệ</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Home className="w-4 h-4 mt-1 " />
                <span className="font-medium leading-relaxed">
                  CÔNG TY TNHH CÔNG NGHỆ PHẦN MỀM DUDI
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="font-medium">
                  232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu,
                  <br />
                  Quận 3, Thành phố Hồ Chí Minh, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">0318767897</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="font-medium">dudisoftware@gmail.com</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg px-4 py-2 text-sm w-full max-w-[200px] bg-gray-200"
              />
              <button className="bg-[#FFB4B4] text-black rounded-lg px-4 py-2 text-sm">
                Đăng ký
              </button>
            </div>

            <div className="mt-4 flex gap-4 text-black text-lg ">
              <a href="#" className="border rounded">
                <FaFacebookF />
              </a>
              <a href="#" className="border rounded">
                <FaLinkedinIn />
              </a>
              <a href="#" className="">
                <FaTwitterSquare />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Dịch Vụ</h3>
            <ul className="text-sm space-y-2">
              <li className="font-medium">Lập trình máy tính</li>
              <li className="font-medium">
                Bán buôn máy tính, thiết bị ngoại vi và phần mềm
              </li>
              <li className="font-medium">Xuất bản phần mềm</li>
              <li className="font-medium">Hoạt động thiết kế chuyên ngành</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Địa Chỉ</h3>
            <iframe
              title="map"
              className="w-64 rounded-lg h-50"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.483824899686!2d106.6871793746271!3d10.774207289374406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f00645c89e3%3A0x73b22cf8a5527f12!2sDUDI%20Software!5e0!3m2!1svi!2s!4v1745377895427!5m2!1svi!2s"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-10">
          © 2025 Positivus. All Rights HUVU
        </div>
      </div>
    </footer>
  );
}
