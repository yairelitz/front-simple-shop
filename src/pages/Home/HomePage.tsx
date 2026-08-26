import "./HomePage.css";
import Card from "../../components/Card.tsx";
import type { Product } from "../../types/product.ts";
import { useEffect, useState } from "react";  
import { getProducts } from "../../services/auth.service.ts";
import type { Cart } from "../../types/cart.ts";
import { useSearchParams } from "react-router-dom";

type HomePageProps = {
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

function HomePage({ setCart }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("שגיאה בטעינת מוצרים");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            product={product}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;