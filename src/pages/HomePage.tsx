import "../styles.css";
// import Card from "../components/Card.tsx";
// import Header from "../components/Header.tsx";
import type { Product } from "../types.ts";
import { useEffect, useState } from "react";
import { getProducts } from "../services/auth.service.ts";
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
      console.log(data)
      console.log(products)

      } catch {
        setError("שגיאה בטעינת מוצרים");
      } finally {
        setLoading(false);
      }
    };


    fetchProducts();
  }, []);

  useEffect(() => {
console.log(products)
  },[])

  if (loading) return <p>טוען...</p>;
  if (error) return <p>{error}</p>;
// function HomePage({ products }: HomeProps) {
//   const items = useSelector((state:RootState) => state.cart.items)
  return (
        <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₪ {product.price}</p>
        </div>
      ))}
    </div>
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