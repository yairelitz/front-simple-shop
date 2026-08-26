  import { useState } from "react";
  import { clearCart } from "../services/auth.service";
  import type { Cart } from "../types/cart";
  import Button from "@mui/material/Button";
  import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
  import Dialog from "@mui/material/Dialog";
  // import DialogTitle from "@mui/material/DialogTitle";
  import DialogContent from "@mui/material/DialogContent";
  import DialogActions from "@mui/material/DialogActions";

  type Props = {
    onCleared: (cart: Cart) => void;
  };

  function ClearAllBtn({ onCleared }: Props) {
    const [open, setOpen] = useState(false);

    const handleClear = async () => {
      try {
        const updatedCart = await clearCart();
        onCleared(updatedCart);
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        <Button
          className="cart-clear-btn"
          variant="text"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => setOpen(true)}
        >
          נקה עגלה
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          dir="rtl"
        >
          <DialogContent><br /> כל המוצרים יוסרו מהעגלה.</DialogContent>

          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              className="cart-dialog-cancel"
            >
              ביטול
            </Button>

            <Button
              onClick={handleClear}
              className="cart-dialog-confirm"
            >
              כן, נקה את העגלה
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  export default ClearAllBtn;