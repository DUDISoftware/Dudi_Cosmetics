import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import registerImage from "../../assets/login.png"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: "",
        dateOfBirth: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        district: "",
        gender: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:5000/api/users/register";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message || "Đã xảy ra lỗi");
                return;
            }

            alert("Đăng ký thành công! Bạn có thể đăng nhập");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Lỗi kết nối đến server");
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-[1000px] h-[90vh] flex rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-300">
                <div className="flex flex-col justify-center items-center w-1/2 p-8 order-2">
                    <h1 className="text-2xl font-bold mb-2 text-red-700 text-center">
                        CHÀO MỪNG ĐẾN DUDI COSMETICS
                    </h1>
                    <h2 className="text-lg mb-6 text-gray-500 text-center">
                        VUI LÒNG ĐĂNG KÝ ĐỂ TIẾP TỤC
                    </h2>

                    <form
                        className="w-full max-w-[350px] space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="fullname-input"
                            label="Họ và tên"
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={data.fullname}
                            onChange={(e) => setData({ ...data, fullname: e.target.value })}
                            required
                        />
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
                        <Input
                            label="Số điện thoại"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            required
                        />
                        <Input
                            id="email-input"
                            label="Email"
                            type="email"
                            placeholder="Nhập email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            required
                        />
                        <Input
                            id="password-input"
                            label="Mật khẩu"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                            label="Đăng Ký"
                            className="w-full py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 text-sm"
                        />
                    </form>

                    <div
                        className="cursor-pointer text-sm mt-4 hover:text-red-600 underline"
                        onClick={() => navigate("/login")}
                    >
                        Đã có tài khoản? Đăng nhập ngay
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center bg-[#FFEDE1] order-1">
                    <img
                        src={registerImage}
                        alt="Register"
                        className="max-w-[80%] max-h-[80%] object-contain rounded-lg transition-transform duration-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;