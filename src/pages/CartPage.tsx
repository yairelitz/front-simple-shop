import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { removeOneFromCart, clearCart } from "../Features/cartSlice";
// import { useAppSelector } from "../hooks";
import Header from "../components/Header";
import type { RootState } from "../store";
// import { decrement, resetCounter } from "../Features/counterSlice";

function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  // const items = useAppSelector((state) => state.cart.items);
  // const items = useAppSelector((state) => state.counter.count);

  const dispatch = useDispatch();

  const removeById = (id: number) => {
    dispatch(removeOneFromCart(id));
    // dispatch(decrement())
  };
  const handelClearAll = () => {
    dispatch(clearCart());
    // dispatch(resetCounter())
  };
  return (
    <>
    <Header/>
      <h2>מוצרים בעגלה: {items.length}</h2>
      <div className="product-grid">
        {items.length > 0 && <button onClick={handelClearAll}>נקה הכל</button>}
        {items.length === 0 && <p>The cart is empty</p>}
        {items.map((item) => (
          <div className="productInCart" key={item.id}>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price} ₪</p>
            <button onClick={() => removeById(item.id)}>הסר</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default CartPage;