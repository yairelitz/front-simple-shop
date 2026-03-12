import { toast } from "react-toastify";
import { addToCart } from "../services/auth.service";
import type { Product } from "../types/types";
import Button from "@mui/material/Button";
import { ShoppingCartRounded } from "@mui/icons-material";
// import CartPage from "../pages/CartPage";

type Props = {
  product: Product;
};

function AddToCartButton({ product }: Props) {
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id.toString(),
        quantity: 1,
      });

      toast.success("המוצר נוסף לעגלה 🛒");
      console.log("התוסף בהצלחה",)
    } catch{
      toast.error("שגיאה בהוספה לעגלה");
    }
  };

  return <Button variant="contained" startIcon={<ShoppingCartRounded />}onClick={handleAddToCart}>add to cart</Button>;
}

export default AddToCartButton;
