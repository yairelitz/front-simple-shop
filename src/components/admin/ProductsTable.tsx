import { useEffect, useState } from "react";
import { deleteProduct, getAdminProducts, updateProduct } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  featured?: boolean;
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

  const handleRestore = async (product: Product) => {
    try {
      const { _id, ...productData } = product;
      await updateProduct(_id, { ...productData, isActive: true });

      setProducts((prev) =>
        prev.map((item) => item._id === _id ? { ...item, isActive: true } : item)
      );
      toast.success(`Product "${product.name}" restored successfully.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to restore product.");
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
              <th>מחיקה רכה</th>
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
                  {product.isActive ? (
                    <button
                      className="admin-btn admin-btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                     מחיקה
                    </button>
                  ) : (
                    <button
                      className="admin-btn admin-btn-restore"
                      onClick={() => handleRestore(product)}
                    >
                      שחזור מוצר
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
