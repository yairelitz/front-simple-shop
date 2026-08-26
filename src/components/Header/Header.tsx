import { Link, useSearchParams, useLocation } from "react-router-dom";
import "./Header.css";
import type { Cart } from "../../types/cart";
import type { User } from "../admin/UsersTable";
import LogoutButton from "../LogoutButton";

type NavbarProps = {
  cart: Cart | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

function Header({ cart, user, setUser }: NavbarProps) {
  const location = useLocation();
  const count =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  const selectCategory = (category: string) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link id="logo" to="/">
          MyStore
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">מוצרים</Link>

        <Link to="/cart">
          עגלה🛒 ({count})
        </Link>

        {user?.role === "admin" && <Link to="/admin">ניהול</Link>}

        {!user ? (
          <Link to="/login" className="login-btn">
            התחברות
          </Link>
        ) : (
          <div className="user-section">
            <span className="user-name">👤 {user.name}</span>
            <LogoutButton setUser={setUser} />
          </div>
        )}
      </nav>
            {location.pathname === "/" && (

      <div className="categories">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => selectCategory("all")}
        >
          כל המוצרים
        </button>

        <button
          className={selectedCategory === "phones" ? "active" : ""}
          onClick={() => selectCategory("phones")}
        >
          טלפונים
        </button>

        <button
          className={selectedCategory === "Laptops" ? "active" : ""}
          onClick={() => selectCategory("Laptops")}
        >
          מחשבים ניידים
        </button>

        <button
          className={selectedCategory === "gadgets" ? "active" : ""}
          onClick={() => selectCategory("gadgets")}
        >
          גאדג'טים
        </button>

        <button
          className={selectedCategory === "streaming" ? "active" : ""}
          onClick={() => selectCategory("streaming")}
        >
          סטרימינג
        </button>

        <button
          className={selectedCategory === "wearables" ? "active" : ""}
          onClick={() => selectCategory("wearables")}
        >
          שעונים ואביזרים
        </button>
      </div>
          )}
    </header>
  );
}

export default Header;