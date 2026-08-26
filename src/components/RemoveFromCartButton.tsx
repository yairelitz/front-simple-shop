import { toast } from "react-toastify";
import { removeFromCart } from "../services/auth.service";
// import type { Product } from "../types";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";



type Props = {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string; // אופציונלי
  };
  onRemoved: () => void;
};


function RemoveFromCartButton({ product, onRemoved}: Props) {
  const handleRemove = async () => {
    try {
      await removeFromCart({ productId: product._id});
      toast.success("המוצר הוסר מהעגלה");
    } catch {
      toast.error("שגיאה בהסרת מוצר");
    }
    onRemoved();
  };
  
  

  return (
  <Button
    className="cart-delete-btn"
    onClick={handleRemove}
    aria-label={`הסר את ${product.name} מהעגלה`}
  >
    <DeleteIcon />
  </Button>
);
}

export default RemoveFromCartButton;
