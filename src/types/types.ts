export type Product= {
  // key: number
      _id: number  //שיניתי מסטרינג לנמבר
      // sku: string,
      name: string,
      description :string,
      price: number,
      // category : string,
      image: string,
      // featured: boolean,
      // stock: number,
      // rating: number,
      // isActive : boolean,
      // createdAt : string
};
export type ProductsResponse = {
  success: boolean;
  data: Product[];
};
export type CartResponse = {
  success: boolean;
  data: Product[];
};


