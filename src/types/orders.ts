export type ShippingAddress = {
  street: string;
  city: string;
  postalCode: string;
  country?: string;
};

export type OrderItem = {
  productId: string;  // מזהה המוצר
  name: string;       // שם המוצר בזמן ההזמנה (snapshot)
  price: number;      // מחיר בזמן ההזמנה
  quantity: number;
  subtotal: number;   // price * quantity
};
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";
export type Order = {
  id: string;                  // מזהה ההזמנה
  userId: string;              // מזהה המשתמש
  items: OrderItem[];          // רשימת פריטים
  total: number;               // סכום ההזמנה
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  notes?: string;              // הערות נוספות מהלקוח
  createdAt: string;           // תאריך יצירה
};
export type OrderResponse = {
  success: boolean;
  message: string;
  data: Order | Order[];
};
