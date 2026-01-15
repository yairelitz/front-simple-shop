import { useState } from "react";
import { toast } from "react-toastify";
import { createOrder } from "../services/orders.service";
import type { ShippingAddress, Order } from "../types/orders";

function CheckoutPage() {
  const [address, setAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    postalCode: "",
    country: "Israel",
  });

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // עדכון state לפי הקלט
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "notes") {
      setNotes(value);
    } else {
      setAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order: Order = await createOrder(address, notes);
      toast.success("ההזמנה בוצעה בהצלחה!");
      console.log("Order created:", order);

      // כאן אפשר לרוקן את העגלה (אם רוצים)
      // או לנווט לדף פרטי הזמנה
    } catch (err) {
      toast.error("שגיאה ביצירת ההזמנה");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>כתובת משלוח</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          רחוב:
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          עיר:
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          מיקוד:
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          מדינה:
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          הערות:
          <textarea
            name="notes"
            value={notes}
            onChange={handleChange}
            placeholder="לדוגמה: לצלצל בפעמון"
          />
        </label>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "שולח..." : "מעבר לתשלום"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
