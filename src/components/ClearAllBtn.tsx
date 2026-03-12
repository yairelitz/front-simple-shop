import { clearCart } from "../services/auth.service";
import type { Cart } from "../types/cart";
import Button from "@mui/material/Button";

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

  return <Button variant="contained" onClick={handleClear}>clear all</Button>;
};

export default ClearAllBtn;
