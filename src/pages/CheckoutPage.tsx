import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchOrder } from "../services/orders.service"; // לבדוק סטטוס order

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const { clearCart } = useCart();

  const [statusMessage, setStatusMessage] = useState("Checking payment...");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const paymentStatus = searchParams.get("payment");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const checkPayment = async () => {
      if (paymentStatus === "success" && orderId) {
        try {
          const order = await fetchOrder(orderId);

          if (order.status === "confirmed") {
            setStatusMessage("Payment successful! 🎉 Your order is confirmed.");
            setOrderConfirmed(true);
            // clearCart();
          } else {
            setStatusMessage("Payment received, waiting for confirmation...");
          }

          setTimeout(() => {
            navigate("/");
          }, 5000);

        } catch (err) {
          console.error(err);
          setStatusMessage("Error checking order status. Please contact support.");
        }
      } else if (paymentStatus === "cancel") {
        setStatusMessage("Payment cancelled. You can try again.");
      }
    };

    checkPayment();
  }, [paymentStatus, orderId, navigate]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", textAlign: "center", padding: 20 }}>
      <h2>Checkout Status</h2>
      <p>{statusMessage}</p>

      {orderConfirmed && <p>You will be redirected to home in 5 seconds...</p>}
    </div>
  );
}
