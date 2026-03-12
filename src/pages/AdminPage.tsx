import { useState } from "react";
import Header from "../components/Header";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";
import OrdersTable from "../components/admin/OrdersTable";
import StatsCards from "../components/admin/StatsCards";

function AdminPage() {

  const [view, setView] = useState("products");

  return (<>
    <Header />
    <div>

      <h1>לוח ניהול</h1>

      <button onClick={() => setView("products")}>מוצרים</button>
      <button onClick={() => setView("users")}>משתמשים</button>
      <button onClick={() => setView("orders")}>הזמנות</button>
      <button onClick={() => setView("status")}>סטטיסטיקות</button>

      {view === "products" && <ProductsTable />}
      {view === "users" && <UsersTable />}
      {view === "orders" && <OrdersTable />}
      {view === "status" && <StatsCards />}

    </div>
    </>
  );
}

export default AdminPage;