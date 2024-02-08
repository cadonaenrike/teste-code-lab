import api from "./axiosConfig";
import { Category } from "../types/Product";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get("/category");
  return response.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post("/category", { name });
  return response.data;
};
