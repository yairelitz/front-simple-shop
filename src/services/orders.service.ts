import api from "../api/axios"; // אינסטנס של axios עם Authorization
import type { Order, ShippingAddress, OrderResponse, OrderStatus } from "../types/orders";

/**
 * יצירת הזמנה מהעגלה
 */
export const createOrder = async (shippingAddress: ShippingAddress, notes?: string): Promise<Order> => {
  const res = await api.post<OrderResponse>("/api/orders", {
    shippingAddress,
    notes,
  });
  return res.data.data as Order;
};

/**
 * קבלת כל ההזמנות של המשתמש (אפשר סינון לפי סטטוס)
 */
export const getOrders = async (status?: OrderStatus): Promise<Order[]> => {
  const url = status ? `/api/orders?status=${status}` : "/api/orders";
  const res = await api.get<OrderResponse>(url);
  return res.data.data as Order[];
};

/**
 * קבלת פרטי הזמנה ספציפית
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await api.get<OrderResponse>(`/api/orders/${orderId}`);
  return res.data.data as Order;
};

/**
 * ביטול הזמנה פתוחה
 */
export const cancelOrder = async (orderId: string): Promise<Order> => {
  const res = await api.post<OrderResponse>(`/api/orders/${orderId}/cancel`);
  return res.data.data as Order;
};

/**
 * מעקב ציבורי אחרי סטטוס הזמנה
 */
export const trackOrder = async (orderId: string): Promise<Order> => {
  const res = await api.get<OrderResponse>(`/api/orders/track/${orderId}`);
  return res.data.data as Order;
};
