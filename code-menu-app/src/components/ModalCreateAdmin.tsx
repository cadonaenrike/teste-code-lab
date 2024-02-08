/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  fetchProductById,
} from "../services/productService";
import { fetchCategories } from "../services/categoryService";
import { Product, Category } from "../types/Product";
import "../styles/index.sass";

interface AddProductModalProps {
  onClose: () => void;
  editingProductId?: string | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
  editingProductId,
  setProducts,
}) => {
  const initialProductState: Partial<Product> = {
    name: "",
    description: "",
    ingredients: "",
    qty: 1,
    price: 0,
    photo: "",
    categoryIds: [], // Inicializa categoryIds como um array vazio
  };

  const [productData, setProductData] =
    useState<Partial<Product>>(initialProductState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProductDetails = async () => {
      if (editingProductId) {
        const productToEdit = await fetchProductById(editingProductId);
        if (productToEdit) {
          setProductData(productToEdit);
          setSelectedCategoryId(
            productToEdit.categoryIds && productToEdit.categoryIds.length > 0
              ? productToEdit.categoryIds[0]
              : ""
          );
        } else {
          setProductData(initialProductState);
          setSelectedCategoryId("");
        }
      } else {
        setProductData(initialProductState);
        setSelectedCategoryId("");
      }
    };

    loadProductDetails();
  }, [editingProductId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleSave = async () => {
    const formData: Partial<Product> = {
      ...productData,
      categoryIds: [selectedCategoryId], // Send array with single category ID
    };

    try {
      let savedProduct: Product;
      if (editingProductId) {
        savedProduct = await updateProduct(editingProductId, formData);
      } else {
        savedProduct = await createProduct(formData as Product);
      }

      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === savedProduct.id ? savedProduct : p))
      );
      onClose(); // Fecha o modal após salvar
      window.location.reload(); // Recarrega a página após salvar
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{editingProductId ? "Editar Produto" : "Adicionar Produto"}</h2>

        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            value={productData.description || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredientes</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={productData.ingredients || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="qty">Quantidade</label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={productData.qty || 1}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <div className="price-input">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="R$"
              value={productData.price || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Link da Foto</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={productData.photo || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
          >
            <option value="">Selecione uma categoria</option>{" "}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSave}>
          {editingProductId ? "Atualizar" : "Salvar"}
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
