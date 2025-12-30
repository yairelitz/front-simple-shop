import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login"
import Register from "./pages/Register";
import productsData from "./product.json";
// import { useAppSelector } from "./hooks";
function App() {
  // const items = useAppSelector((state) => state.cart.items);
  return (
    <div>
      <Router>
        {/* <nav className="navbar"> */}
          {/* <Link to="/">Home</Link> | <Link to="/cart">Cart : {items.length}</Link> */}
        {/* </nav> */}
        <Routes>
          <Route path="/" element={<HomePage products={productsData} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
