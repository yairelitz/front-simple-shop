import { toast } from "react-toastify";
import { addToCart, getCart } from "../services/auth.service"; // שים לב שיש getCart
import type { Product } from "../types/product";
import type { Cart } from "../types/cart";
import Button from "@mui/material/Button";
import { ShoppingCartRounded } from "@mui/icons-material";

type Props = {
  product: Product;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
};

function AddToCartButton({ product, setCart }: Props) {
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });
      const freshCart = await getCart();
      setCart(freshCart); // <-- הכי חשוב, כדי שהHeader יתעדכן
      toast.success("המוצר נוסף לעגלה 🛒");
    } catch {
      toast.error("יש להתחבר על מנת להוסיף לעגלה");
    }
  };

  return (
    <Button
      className="add-to-cart-btn"
      variant="contained"
      startIcon={<ShoppingCartRounded />}
      onClick={handleAddToCart}
    >
      הוסף לעגלה
    </Button>
  );
}

export default AddToCartButton;