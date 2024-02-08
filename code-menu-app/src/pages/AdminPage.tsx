import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductList from "../components/ProductListAdmin";
import "../styles/index.sass";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="admin-page">
      <div className="header-admin-page">
        <h2>Gerenciador de Produtos</h2>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
      <AdminProductList />
    </div>
  );
};

export default AdminPage;
