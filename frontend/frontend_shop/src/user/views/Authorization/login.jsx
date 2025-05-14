import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import loginImage from "../../../../public/login.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = "http://localhost:5000/api/users/login";

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
                setLoading(false);
                return;
            }

            // Kiểm tra dữ liệu trả về từ server
            if (!result.token || !result.user?.role) {
                alert("Dữ liệu trả về không hợp lệ");
                setLoading(false);
                return;
            }

            // Lưu token và role vào localStorage
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.user.role);

            // Điều hướng dựa trên role
            if (result.user.role === "admin") {
                navigate("/admin/voucherlist");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error("Lỗi kết nối đến server:", error);
            alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-[1000px] h-[90vh] flex rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-300">
                <div className="flex flex-col justify-center items-center w-1/2 p-8 order-1">
                    <h1 className="text-2xl font-bold mb-2 text-red-700 text-center">
                        CHÀO MỪNG QUAY LẠI
                    </h1>
                    <h2 className="text-lg mb-6 text-gray-500 text-center">
                        VUI LÒNG ĐĂNG NHẬP ĐỂ TIẾP TỤC
                    </h2>

                    <form
                        className="w-full max-w-[350px] space-y-4"
                        onSubmit={handleSubmit}
                    >
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
                            label={loading ? "Đang xử lý..." : "Đăng Nhập"}
                            className={`w-full py-2 mt-2 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                } text-white rounded-md transition-all duration-300 text-sm`}
                            disabled={loading}
                        />
                    </form>

                    <div
                        className="cursor-pointer text-sm mt-4 hover:text-red-600 underline"
                        onClick={() => navigate("/register")}
                    >
                        Chưa có tài khoản! Đăng ký ngay
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center bg-[#FFEDE1] order-2">
                    <img
                        src={loginImage}
                        alt="Login"
                        className="max-w-[80%] max-h-[80%] object-contain rounded-lg transition-transform duration-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;