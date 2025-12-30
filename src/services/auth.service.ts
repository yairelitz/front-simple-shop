import api from "../api/axios";
import type { Product } from "../types";
import type { LoginData, RegisterData, AuthResponse} from "../types/auth";

export const login = async (data: LoginData):Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/login",data);
  return res.data;
};

export const register = async (data: RegisterData):Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/register",data);
  return res.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("api/products");
  return response.data;
};
