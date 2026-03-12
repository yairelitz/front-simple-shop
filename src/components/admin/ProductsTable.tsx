import { useEffect, useState } from "react";
import { getAdminProducts } from "../../services/admin.service";
type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
};
function ProductsTable() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAdminProducts();
        console.log(data.data.products)
        setProducts(data.data.products);
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <div>Loading products...</div>;

  return (
    <div>

      

      <h2>Products</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Active</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.isActive.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ProductsTable;