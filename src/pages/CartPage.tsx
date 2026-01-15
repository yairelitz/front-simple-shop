import "../styles.css";
// import { useDispatch, useSelector } from "react-redux";
// import { removeOneFromCart, clearCart } from "../Features/cartSlice";
// import { useAppSelector } from "../hooks";
import Header from "../components/Header";
// import type { RootState } from "../store";
// import { decrement, resetCounter } from "../Features/counterSlice";
import { useEffect, useState } from "react";
import type { Cart } from "../types/cart";
import { getCart, updateCartItem } from "../services/auth.service";
import RemoveFromCartButton from "../components/RemoveFromCartButton";
import QuantityUpdate from "../components/QuantityUpdate";
import ClearAllBtn from "../components/ClearAllBtn";
// import type { Product } from "../types";
function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  const increaseQty = async (productId: string, currentQty: number) => {
  const updatedCart = await updateCartItem(
    productId,
    currentQty + 1
  );
  setCart(updatedCart);
};

const decreaseQty = async (productId: string, currentQty: number) => {
  if (currentQty === 1) return;

  const updatedCart = await updateCartItem(
    productId,
    currentQty - 1
  );
  setCart(updatedCart);
};
const handleRemoved = async () => {
  const freshCart = await getCart();
  setCart(freshCart);
};

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  if (!cart) return <p>טוען עגלה...</p>;

  return (
    <>
      <Header />

      <h2>העגלה שלי</h2>

      <h3>סה״כ לתשלום: ₪{cart.total}</h3>

      <div className="container">

      {cart.items.map((item) => (
        <div key={item.product._id} className="cardd">
          <p>{item.product.name}</p>
          <p>כמות: {item.quantity}</p>
          <p>מחיר: ₪{item.product.price}</p>
          <QuantityUpdate quantity={item.quantity} 
          onIncrease={() => increaseQty(item.product._id, item.quantity)}
      onDecrease={() => decreaseQty(item.product._id, item.quantity)}/>
          <RemoveFromCartButton product={item.product} onRemoved={handleRemoved} />
        </div>
      ))}
      {cart.items.length > 0 && <ClearAllBtn onCleared={setCart}/>}

      </div>
    </>
  );
}

export default CartPage;
