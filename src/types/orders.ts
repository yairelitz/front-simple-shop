export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderPayload {
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: "stripe";
  notes?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  status: "pending_payment" | "confirmed" | string;
  paymentStatus: "pending" | "paid" | string;
  paymentIntentId: string;
  paymentProvider: string;
  totalAmount: number;
  items: any[];
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    order: Order;
    payment: {
      clientSecret: string;
      checkoutUrl: string;
    };
  };
  message: string;
}