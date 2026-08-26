import { useEffect, useState } from "react";
import { getAdminOrders } from "../../services/admin.service";
// types/order.ts
export interface Order {
  _id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
  user: string;
}
function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAdminOrders();
        // אם השרת מחזיר { orders: [...] }
        setOrders(data.data.orders || []);
        console.log(data.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <>
      {/* <h2>הזמנות</h2> */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>לקוח</th>
              <th>סכום</th>
              <th>סטטוס הזמנה</th>
              <th>תאריך ביצוע הזמנה</th>
              <th>מס' הזמנה</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user.name}</td>
                <td>₪ {order.totalAmount}</td>
                <td>{order.status}</td>
                <td className="order-date">
                  <span className="order-date-main">
                    {new Date(order.createdAt).toLocaleDateString("he-IL")}
                  </span>

                  <span className="order-date-time">
                    {new Date(order.createdAt).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
                {/* <td>{new Date(order.createdAt).toLocaleString()}</td> */}
                <td>{order.orderNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersTable;
