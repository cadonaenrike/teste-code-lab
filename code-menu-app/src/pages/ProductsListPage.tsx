import React from "react";
import ProductList from "../components/ProductList";
import "../styles/index.sass";

const ProductListPage: React.FC = () => {
  return (
    <div className="product-list-page">
      <h2>Nosso Cardápio</h2>
      <ProductList />
    </div>
  );
};

export default ProductListPage;
