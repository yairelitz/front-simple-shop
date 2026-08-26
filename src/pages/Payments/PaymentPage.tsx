import { useState } from "react";
import { createOrder } from "../../services/orders.service";
import type { CreateOrderPayload } from "../../types/orders";
import "./PaymentPage.css"

interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function PaymentPage() {

  const [loading, setLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Israel",
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Israel",
  });

  const [notes, setNotes] = useState("");

  const handleShippingChange = (field: string, value: string) => {
    setShippingAddress({
      ...shippingAddress,
      [field]: value,
    });
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingAddress({
      ...billingAddress,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.fullName || !shippingAddress.phone) {
      alert("Please enter name and phone");
      return;
    }

    setLoading(true);

    try {

      const orderData: CreateOrderPayload = {
        shippingAddress,
        billingAddress: sameAsShipping ? { ...shippingAddress } : billingAddress,
        paymentMethod: "stripe",
        notes,
      };

      const res = await createOrder(orderData);

      const checkoutUrl = res.data.payment.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

    } catch (err: any) {
      console.error(err);
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="payment-container">

        <h2>Checkout</h2>
        <div className="payment-layout">

        <form className="payment-form" onSubmit={handleSubmit}>

          <h3>Shipping Address</h3>

          <input
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={(e) => handleShippingChange("fullName", e.target.value)}
            required
          />

          <input
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={(e) => handleShippingChange("phone", e.target.value)}
            required
          />

          <input
            placeholder="Street"
            value={shippingAddress.street}
            onChange={(e) => handleShippingChange("street", e.target.value)}
            required
          />

          <input
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) => handleShippingChange("city", e.target.value)}
            required
          />

          <input
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={(e) => handleShippingChange("postalCode", e.target.value)}
            required
          />

          <input
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) => handleShippingChange("country", e.target.value)}
          />

          <div>
            <label>
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(!sameAsShipping)}
              />
              Billing address same as shipping
            </label>
          </div>

          {!sameAsShipping && (
            <>
              <h3>Billing Address</h3>

              <input
                placeholder="Full Name"
                value={billingAddress.fullName}
                onChange={(e) => handleBillingChange("fullName", e.target.value)}
              />

              <input
                placeholder="Phone"
                value={billingAddress.phone}
                onChange={(e) => handleBillingChange("phone", e.target.value)}
              />

              <input
                placeholder="Street"
                value={billingAddress.street}
                onChange={(e) => handleBillingChange("street", e.target.value)}
              />

              <input
                placeholder="City"
                value={billingAddress.city}
                onChange={(e) => handleBillingChange("city", e.target.value)}
              />

              <input
                placeholder="Postal Code"
                value={billingAddress.postalCode}
                onChange={(e) => handleBillingChange("postalCode", e.target.value)}
              />

              <input
                placeholder="Country"
                value={billingAddress.country}
                onChange={(e) => handleBillingChange("country", e.target.value)}
              />
            </>
          )}

          <h3>Notes</h3>

          <textarea
            placeholder="Order notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}>
            {loading ? "Redirecting to payment..." : "Pay with Stripe"}
          </button>

        </form>
        </div>
      </div>
    </>
  );
}
