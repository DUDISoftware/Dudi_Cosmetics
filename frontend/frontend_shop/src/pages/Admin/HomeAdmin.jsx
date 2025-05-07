// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import AdminSidebar from "./components/AdminSidebar";

// const HomeAdmin = () => {
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState({});

//   useEffect(() => {
//     const role = localStorage.getItem("role");

//     if (role !== "admin") {
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar cố định */}
//       <AdminSidebar admin={admin} />

//       {/* Main Content - Đẩy sang phải để không bị che */}
//       <div className="flex-1 p-6 bg-gray-100 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default HomeAdmin;
