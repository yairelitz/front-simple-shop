import type { Cart } from "../types/cart.ts";
import type { Product } from "../types/product.ts";
import AddToCartButton from "./AddToCartButton.tsx";
import { Link } from "react-router-dom";
import StarRating from "./StarRating.tsx";
type Props = {
  product: Product;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};
export default function Card({ product, setCart }: Props) {
  return (
    <div className="card">
      <Link to={`/products/${product._id}`} className="card-product-link" aria-label={`לצפייה ב-${product.name}`}>
        <img className="images" src={product.image} alt={product.name}/>
      </Link>
      <div className="card-content">
      <h3><Link to={`/products/${product._id}`} className="card-product-link">{product.name}</Link></h3>
      <StarRating rating={product.rating} />
      <p>{product.description}</p>
      <h2>₪ {product.price}</h2>
      <Link to={`/products/${product._id}`} className="details-link">לפרטי המוצר</Link>
      <AddToCartButton product={product} setCart={setCart} />
      </div>
    </div>
  );
}
