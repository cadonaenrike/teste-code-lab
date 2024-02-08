import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../services/productService";
import { fetchCategories } from "../services/categoryService";
import "../styles/index.sass";
import { Product, Category } from "../types/Product";
import AddProductModal from "./ModalCreateAdmin";

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const fetchedCategories = await fetchCategories();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Falha ao buscar dados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleOpenModal = (productId: string | null = null) => {
    setEditingProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setFilteredProducts(
        products.filter((product) =>
          product.categories?.some((category) => category.id === categoryId)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="product-list-page">
      <div className="category-buttons">
        <button
          className="btnCategory"
          onClick={() => handleCategoryChange(null)}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            className="btnCategory"
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
        <button className="add-Product" onClick={() => handleOpenModal(null)}>
          Adicionar Produto
        </button>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-item" key={product.id}>
            <div className="product-card">
              <img
                className="product-image"
                src={product.photo}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>

                <p>Preço: R${product.price}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleOpenModal(product.id)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddProductModal
          onClose={handleCloseModal}
          editingProductId={editingProductId}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default AdminProductList;
