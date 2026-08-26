import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/auth.service";
import type { Cart } from "../../types/cart";
import type { Product } from "../../types/product";
import AddToCartButton from "../../components/AddToCartButton";
import StarRating from "../../components/StarRating";
import "./ProductPage.css";

type ProductPageProps = {
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

function ProductPage({ setCart }: ProductPageProps) {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        setProduct(products.find((item) => item._id === productId) ?? null);
      } catch (error) {
        console.error("Failed to load product:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) return <p className="product-status">טוען מוצר...</p>;

  if (hasError || !product) {
    return (
      <section className="product-status">
        <h1>המוצר לא נמצא</h1>
        <Link to="/">חזרה לכל המוצרים</Link>
      </section>
    );
  }

  return (
    <section className="product-page">
      <Link to="/" className="back-link">← חזרה למוצרים</Link>
      <article className="product-details">
        <div className="product-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} showValue />
          <p className="product-description">{product.description}</p>
          <p className="product-stock">
            {product.stock > 0 ? `במלאי: ${product.stock} יחידות` : "המוצר אזל מהמלאי"}
          </p>
          <p className="product-price">₪{product.price.toLocaleString("he-IL")}</p>
          <AddToCartButton product={product} setCart={setCart} />
        </div>
      </article>
    </section>
  );
}

export default ProductPage;
