import api from "../api/axios";

/* =========================
   PRODUCTS
========================= */

// GET /api/admin/products
export const getAdminProducts = async () => {
  const res = await api.get("/api/admin/products");
  return res.data;
};

// POST /api/admin/products
export const createProduct = async (payload: any) => {
  const res = await api.post("/api/admin/products", payload);
  return res.data;
};

// PUT /api/admin/products/:id
export const updateProduct = async (id: string, payload: any) => {
  const res = await api.put(`/api/admin/products/${id}`, payload);
  return res.data;
};

// DELETE /api/admin/products/:id (soft delete)
export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/api/admin/products/${id}`);
  return res.data;
};

/* =========================
   USERS
========================= */

// GET /api/admin/users
export const getAdminUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

// PUT /api/admin/users/:id/role
export const updateUserRole = async (id: string, role: string) => {
  const res = await api.put(`/api/admin/users/${id}/role`, { role });
  return res.data;
};

/* =========================
   ORDERS
========================= */

// GET /api/admin/orders
export const getAdminOrders = async () => {
  const res = await api.get("/api/admin/orders");
  return res.data;
};

// PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.put(`/api/admin/orders/${id}/status`, { status });
  return res.data;
};

/* =========================
   STATS
========================= */

// GET /api/admin/stats/summary
export const getAdminStatsSummary = async () => {
  const res = await api.get("/api/admin/stats/summary");
  return res.data;
};