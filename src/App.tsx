import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import PaymentResult from "./pages/Payments/PaymentPageResult";
import HomePage from "./pages/Home/HomePage";
import CartPage from "./pages/Cart/CartPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./pages/Payments/PaymentPage";
import CheckoutPage from "./pages/Payments/CheckoutPage";
import AdminPage from "./pages/Admin/AdminPage";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { getCart, verifyUser, type User } from "./services/auth.service";
import type { Cart } from "./types/cart";
import Footer from "./components/Footer/Footer";
import ProductsTable from "./components/admin/ProductsTable";
import AddProduct from "./components/admin/AddProduct";
import ProductPage from "./pages/Product/ProductPage";

function App() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await verifyUser();
        setUser(currentUser ?? null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user){
          const data = await getCart();
          setCart(data);
        }
      } catch {
        // User not logged in — cart stays null
      }
    };
    fetchCart();
  }, [user]);

  return (
  <div className="app">
    <ToastContainer position="top-center" autoClose={2000} />

    <Router basename="/front-simple-shop">
      <Header cart={cart} user={user} setUser={setUser} />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage setCart={setCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart}/>} />
          <Route path="/products/:productId" element={<ProductPage setCart={setCart} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<ProductsTable />} />
          <Route path="/admin/products/new" element={<AddProduct />} />
          <Route path="/payment-result" element={<PaymentResult />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  </div>
);
}

export default App;
