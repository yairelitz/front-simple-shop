import { toast } from "react-toastify";
import { removeFromCart } from "../services/auth.service";
// import type { Product } from "../types";

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
  
  

  return <button onClick={handleRemove}>הסר מהעגלה</button>;
}

export default RemoveFromCartButton;
