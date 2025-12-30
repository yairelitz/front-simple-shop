import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";



function Header() {
  const items = useSelector((state: RootState) => state.cart.items);
  return (
    <header className="navbar">
      <Link to="/">חנות</Link>
      <Link to="/register">הירשמו לאתר</Link>
      <Link to="/cart">עגלה ({items.length})</Link>
    </header>
  );
}

export default Header;
