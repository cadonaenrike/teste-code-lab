import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { Product } from "../types/Product";
import "../styles/index.sass"; // Importando o arquivo SASS

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const loadProductDetails = async () => {
        try {
          setLoading(true);
          const productDetails = await fetchProductById(productId);
          console.log(productDetails);
          setProduct(productDetails);
        } catch (err) {
          setError("Falha ao buscar detalhes do produto");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadProductDetails();
    }
  }, [productId]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!product) return <div className="not-found">Produto não encontrado.</div>;

  return (
    <div className="product-detail-page">
      <div className="product-container">
        <img src={product.photo} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <h3 className="product-title">{product.description}</h3>
          <h4 className="product-ingredients">
            Ingredientes: {product.ingredients}
          </h4>
          <div className="price-container">
            <p className="product-price">R$ {product.price}</p>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="add-to-cart-button">
          Adicionar ao seu Carrinho
        </button>
      </div>
    </div>
  );
};
export default ProductDetailPage;
