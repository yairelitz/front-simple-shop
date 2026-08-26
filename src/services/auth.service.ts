import api from "../api/axios";
import type { Product } from "../types/product";
import type {
  LoginData,
  RegisterData,
  AuthResponse,
  AddToCartPayload,
  RemoveFrom,
  
} from "../types/auth";
import type { ProductsResponse } from "../types/product";
import type { CartResponse, Cart } from "../types/cart";
export type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  
};
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/login", data);
  console.log("res data.data : ", res.data.data);
  return res.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/logout");
  console.log("res data.data : ", res.data.data);
  return res.data;
};

export const googleLogin = async (idToken: string): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/google", {
    idToken,
  });

  return res.data;
};


export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/register", data);
  return res.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/api/products");
  console.log("FULL RESPONSE DATA:", response.data);
  return response.data.data;
};

export const getCart = async (): Promise<Cart> => {
  const response = await api.get<CartResponse>("/api/cart");
  // console.log("full response data:", response.data);
  return response.data.data;
};

export const addToCart = async (payload: AddToCartPayload): Promise<Cart> => {
  const res = await api.post<CartResponse>("/api/cart/add", payload);
  return res.data.data;
};

export const removeFromCart = async (payload: RemoveFrom): Promise<Cart> => {
  const res = await api.delete<CartResponse>("/api/cart/remove", {
    data: payload,
  });
  return res.data.data;
};

export const updateCartItem = async (productId: string,quantity: number): Promise<Cart> => {
  const res = await api.put("/api/cart/update", {
    productId,
    quantity,
  });

  // לפי הדוקו: { success, message, data }
  return res.data.data;
};

export const clearCart = async (): Promise<Cart> => {
  const res = await api.delete<CartResponse>("/api/cart/clear");
  return res.data.data;
};
export const verifyUser = async (): Promise<User | null> => {
  try {
    const res = await api.get("/api/auth/verify");
    return res.data.data.user; // ⚠️ כאן מחזירים את האובייקט, לא מחרוזת
  } catch {
    return null;
  }
};

