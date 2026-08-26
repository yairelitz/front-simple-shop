import "./CartPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Cart } from "../../types/cart";
import {getCart,updateCartItem} from "../../services/auth.service";
import RemoveFromCartButton from "../../components/RemoveFromCartButton";
import QuantityUpdate from "../../components/QuantityUpdate";
import ClearAllBtn from "../../components/ClearAllBtn";
import HomePageBtn from "../../components/HomePageBtn";

type CartPageProps = {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

function CartPage({ cart, setCart }: CartPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
        console.log("first")
      } catch (err) {
        console.log(err);
        navigate("/login");
        toast.error("עליך להירשם או להתחבר בכדי להיכנס לעגלה",{
          toastId: "login-required",
        });
      }
    };
    fetchCart();
  }, [navigate, setCart]);

  
  const increaseQty = async (productId: string, currentQty: number) => {
    const updatedCart = await updateCartItem(productId, currentQty + 1);
    setCart(updatedCart);
  };
  
  const decreaseQty = async (productId: string, currentQty: number) => {
    if (currentQty === 1) return;
    const updatedCart = await updateCartItem(productId, currentQty - 1);
    setCart(updatedCart);
  };
  
  const handleRemoved = async () => {
    const freshCart = await getCart();
    setCart(freshCart);
    console.log("second")
  };
  
  const handleCheckout = () => {
    navigate("/payment");
  };
  
  if (!cart) {
    return (
      <main className="cart-page">
        <div className="cart-loading">טוען את העגלה...</div>
      </main>
    );
  }

  const isEmpty = cart.items.length === 0;

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-section">
            <h1>
              <span className="cart-title-icon">🛒</span>
              עגלת קניות
            </h1>

            {!isEmpty && (
              <p>
                {cart.items.length}{" "}
                {cart.items.length === 1 ? "פריט" : "פריטים"}
              </p>
            )}
          </div>

          {!isEmpty && <ClearAllBtn onCleared={setCart} />}
        </div>

        {/* Empty */}
        {isEmpty ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>

            <h2>העגלה שלך ריקה</h2>

            <p>עדיין לא הוספת מוצרים לעגלה.</p>

            <HomePageBtn />
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="cart-table-header">
              <span className="cart-product-column">מוצר</span>

              <span className="cart-quantity-column">כמות</span>

              <span className="cart-price-column">מחיר</span>
            </div>

            {/* Products */}
            <div className="cart-items">
              {cart.items.map((item) => {
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div key={item.product._id} className="cart-item">
                    <div className="cart-product">
                      <div className="cart-product-image-wrapper">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="cart-product-image"
                        />
                      </div>

                      <div className="cart-product-info">
                        <span className="cart-product-name">
                          {item.product.name}
                        </span>
                        {item.product.description && (
                          <span className="cart-product-description">
                            {item.product.description}
                          </span>
                        )}

                        <span className="cart-product-unit">
                          ₪{item.product.price} ליחידה
                        </span>
                      </div>
                    </div>

                    <div className="cart-quantity">
                      <QuantityUpdate
                        quantity={item.quantity}
                        onIncrease={() =>
                          increaseQty(item.product._id, item.quantity)
                        }
                        onDecrease={() =>
                          decreaseQty(item.product._id, item.quantity)
                        }
                      />
                    </div>

                    <div className="cart-price">
                      <strong>₪{itemTotal.toFixed(2)}</strong>

                      <RemoveFromCartButton
                        product={item.product}
                        onRemoved={handleRemoved}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-info">
                <span>סה״כ לתשלום</span>

                <strong>₪{cart.total}</strong>
              </div>

              <button className="cart-checkout" onClick={handleCheckout}>
                לתשלום מאובטח
                <span>←</span>
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default CartPage;
