import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.sass";
import { ProductCardProps } from "../types/Product";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card">
      <img src={product.photo} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="details-price-container">
          <button className="view-ingredients-btn" onClick={handleViewDetails}>
            Detalhes
          </button>
          <div className="product-price">
            <p>R$ {product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
