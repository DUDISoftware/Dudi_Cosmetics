import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
    </div>
  );
};

export default AdminPage;
