import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login"
import Register from "./pages/Register";
// import productsData from "./product.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./pages/PaymentPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPage from "./pages/AdminPage";

// import { useAppSelector } from "./hooks";
function App() {
  // const items = useAppSelector((state) => state.cart.items);
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        {/* <nav className="navbar"> */}
          {/* <Link to="/">Home</Link> | <Link to="/cart">Cart : {items.length}</Link> */}
        {/* </nav> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
