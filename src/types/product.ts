export type Product= {
      _id: string,
      name: string,
      description :string,
      price: number,
      category : string,
      image: string,
      stock: number,
      rating?: number,

};
export type ProductsResponse = {
  success: boolean;
  data: Product[];
};
export type CartResponse = {
  success: boolean;
  data: Product[];
};


