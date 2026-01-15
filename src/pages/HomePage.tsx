import "../styles.css";
import Card from "../components/Card.tsx";
import type { Product } from "../types/types.ts";
import { useEffect, useState } from "react";
import { getProducts } from "../services/auth.service.ts";
import Header from "../components/Header.tsx";
// import { data } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store";
// type HomeProps = {
//   products: Product[];
// };
function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        console.log(data);
        console.log(products);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("שגיאה בטעינת מוצרים");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("products updated:", products);
  }, [products]);

  if (loading) return <p>טוען...</p>;
  if (error) return <p>{error}</p>;
  // function HomePage({ products }: HomeProps) {
  //   const items = useSelector((state:RootState) => state.cart.items)
  return (
    <>
      <Header />
      <div className="container">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </>
    // <>
    //   <Header/>
    //   <div className="product-grid">
    //     {products.map((product) => (
    //       <Card
    //         key={product.id}
    //         id={product.id}
    //         image={product.image}
    //         name={product.name}
    //         description={product.description}
    //         price={product.price}
    //       />
    //     ))}
    //   </div>
    // </>
  );
}
export default HomePage;
