import api from "./axiosConfig";
import { Product } from "../types/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/product");
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const createProduct = async (productData: Product): Promise<Product> => {
  const response = await api.post("/product/", productData);
  return response.data;
};

export const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  const response = await api.patch(`/product/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/product/${id}`);
};
