import type { Cart } from "../types/cart.ts";
import type { Product } from "../types/product.ts";
import AddToCartButton from "./AddToCartButton.tsx";
type Props = {
  product: Product;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};
export default function Card({ product, setCart }: Props) {
  return (
    <div className="card">
      <img className="images" src={product.image} alt={product.name}/>
      <div className="card-content">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h2>₪ {product.price}</h2>
      <AddToCartButton product={product} setCart={setCart} />
      </div>
    </div>
  );
}
