import { useEffect, useState } from "react";
import { deleteProduct, getAdminProducts } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
};

function ProductsTable() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAdminProducts();
        setProducts(data.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const deletedProduct = await deleteProduct(id);

      setProducts(prev =>
        prev.map(p =>
          p._id === id ? deletedProduct : p
        )
      );

      toast.success(`Product "${deletedProduct.name}" deleted!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      {/* <h2>מוצרים</h2> */}

      <button
        className="admin-btn admin-btn-add"
        onClick={() => navigate("/admin/products/new")}
      >
        ➕ Add Product
      </button>

      <div className="admin-table-container">
        <table className="admin-table">
          
          {/* ✅ תוקן כאן */}
          <thead>
            <tr>
              <th>שם המוצר</th>
              <th>מחיר</th>
              <th>כמות במלאי</th>
              <th>סטטוס</th>
              <th></th> {/* עמודת כפתור */}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td> ₪ {product.price}</td>
                <td>{product.stock}</td>
                <td>
                  {product.isActive ? "פעיל" : "לא פעיל"}
                </td>

                <td>
                  {product.isActive && (
                    <button
                      className="admin-btn admin-btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ProductsTable;