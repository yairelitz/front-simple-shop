import { useState } from "react";
import { createOrder } from "../services/orders.service"
import Header from "../components/Header";

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [notes, setNotes] = useState("");

  const   handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createOrder({
        shippingAddress,
        billingAddress,
        paymentMethod: "stripe",
        notes,
      });

      // הפניה ל-Stripe
      window.location.href = res.data.payment.checkoutUrl;

    } catch (err) {
      console.error("Order failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <Header />
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <h3>Shipping Address</h3>

        <input
          placeholder="Street"
          value={shippingAddress.street}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              street: e.target.value,
            })
          }
        />

        <input
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              city: e.target.value,
            })
          }
        />

        <input
          placeholder="Postal Code"
          value={shippingAddress.postalCode}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              postalCode: e.target.value,
            })
          }
        />

        <input
          placeholder="Country"
          value={shippingAddress.country}
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              country: e.target.value,
            })
          }
        />

        <h3>Billing Address</h3>

        <input
          placeholder="Street"
          value={billingAddress.street}
          onChange={(e) =>
            setBillingAddress({
              ...billingAddress,
              street: e.target.value,
            })
          }
        />

        <input
          placeholder="City"
          value={billingAddress.city}
          onChange={(e) =>
            setBillingAddress({
              ...billingAddress,
              city: e.target.value,
            })
          }
        />

        <input
          placeholder="Postal Code"
          value={billingAddress.postalCode}
          onChange={(e) =>
            setBillingAddress({
              ...billingAddress,
              postalCode: e.target.value,
            })
          }
        />

        <input
          placeholder="Country"
          value={billingAddress.country}
          onChange={(e) =>
            setBillingAddress({
              ...billingAddress,
              country: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Order notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
    </>
  );
}