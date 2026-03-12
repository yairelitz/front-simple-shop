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
      await removeFromCart({ productId: product._id.toString() });
      toast.success("המוצר הוסר מהעגלה");
    } catch {
      toast.error("שגיאה בהסרת מוצר");
    }
    onRemoved();
  };
  
  

  return <Button  variant="contained" startIcon={<DeleteIcon />} onClick={handleRemove}>הסר מהעגלה</Button>;
}

export default RemoveFromCartButton;
