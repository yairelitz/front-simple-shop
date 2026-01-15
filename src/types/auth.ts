export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  data: {
    token: string;
    user: {
      _id: string;
      email: string;
      name: string;
    };
  };
};
export type AddToCartPayload = {
  productId: string;
  quantity: number;
};
export type RemoveFrom = {
  productId: string;
}

export type ClearCart = {
  productId: string;
}





