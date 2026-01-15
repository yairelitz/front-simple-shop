import { clearCart } from "../services/auth.service";
import type { Cart } from "../types/cart";
type Props = {
  onCleared: (cart: Cart) => void;
};

function ClearAllBtn({onCleared}: Props) {
  const handleClear = async () => {
    try {
      const updatedCart = await clearCart();
      onCleared(updatedCart);
    } catch {
      console.error();
    }
  };

  return <button onClick={handleClear}>clear all</button>;
};

export default ClearAllBtn;
