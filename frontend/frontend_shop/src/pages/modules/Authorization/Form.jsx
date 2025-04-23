import React, { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/Button/Button";
import loginImage from "../../../assets/images/sp1.png";
import registerImage from "../../../assets/images/sp3.png";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Form = ({ isSignInPage = false }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    ...(isSignInPage
      ? {}
      : {
          fullname: "",
          dateOfBirth: "",
          phone: "",
          address: "",
          country: "",
          city: "",
          district: "",
          gender: "", // Thêm thuộc tính gender
        }),
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isSignInPage ? "Đang đăng nhập..." : "Đang đăng ký...");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-[1000px] h-[90vh] flex rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-300">
        {/* Form Section */}
        <div
          className={`flex flex-col justify-center items-center w-1/2 p-8 ${
            !isSignInPage ? "order-2" : "order-1"
          }`}
        >
          <h1 className="text-2xl font-bold mb-2 text-red-700 text-center">
            CHÀO MỪNG {isSignInPage ? "QUAY LẠI" : "ĐẾN DUDI COSMETICS"}
          </h1>
          <h2 className="text-lg mb-6 text-gray-500 text-center">
            VUI LÒNG {isSignInPage ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"} ĐỂ TIẾP TỤC
          </h2>

          <form
            className="w-full max-w-[350px] space-y-4"
            onSubmit={handleSubmit}
          >
            {/* Thêm phần Giới tính và Ngày sinh cùng hàng */}
            {!isSignInPage && (
              <>
                <div className="w-full">
                  <Input
                    label="Họ và tên"
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={data.fullname}
                    onChange={(e) =>
                      setData({ ...data, fullname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      label="Ngày sinh"
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(e) =>
                        setData({ ...data, dateOfBirth: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-700">Giới tính</label>
                    <select
                      value={data.gender}
                      onChange={(e) =>
                        setData({ ...data, gender: e.target.value })
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-[#FFF6F4]"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <Input
                    label="Số điện thoại"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Nhập email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <Input
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />

            {isSignInPage && (
              <div className="w-full text-right text-sm text-blue-500 hover:underline">
                <span className="cursor-pointer">Quên mật khẩu?</span>
              </div>
            )}

            <Button
              type="submit"
              label={isSignInPage ? "Đăng Nhập" : "Đăng Ký"}
              className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 text-sm"
            />

            {isSignInPage && (
              <>
                <div className="text-center text-sm text-gray-500 my-2">
                  Hoặc
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-700">Đăng nhập với</span>
                  <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                    <FaFacebookF />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                    <FaGoogle />
                  </button>
                </div>
              </>
            )}
          </form>

          <div
            className="cursor-pointer text-sm mt-4 hover:text-red-600 underline"
            onClick={() => navigate(isSignInPage ? "/register" : "/login")}
          >
            {isSignInPage
              ? "Chưa có tài khoản! Đăng ký ngay"
              : "Đã có tài khoản? Đăng nhập ngay"}
          </div>
        </div>

        {/* Image Section */}
        <div
          className={`w-1/2 flex justify-center items-center bg-gray-200 ${
            !isSignInPage ? "order-1" : "order-2"
          }`}
        >
          <img
            src={isSignInPage ? loginImage : registerImage}
            alt={isSignInPage ? "Login" : "Register"}
            className="max-w-[80%] max-h-[80%] object-contain rounded-lg transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
