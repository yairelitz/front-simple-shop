import { useEffect, useMemo, useState } from "react";
import { getAdminOrders, getAdminProducts, getAdminStatsSummary } from "../../services/admin.service";

type AdminOrder = { _id: string; createdAt: string; totalAmount?: number; total?: number; status?: string };
type AdminProduct = { _id: string; stock?: number; isActive?: boolean };
type SummaryStats = {
  users?: { total?: number };
  orders?: { open?: number; total?: number };
  sales?: { total?: number };
  inventory?: { activeProducts?: number };
};

const numberValue = (value: unknown) => typeof value === "number" ? value : 0;
const formatMoney = (value: number) => `₪${value.toLocaleString("he-IL", { maximumFractionDigits: 0 })}`;

function StatsCards() {
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [range, setRange] = useState<7 | 30 | 90>(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryResponse, ordersResponse, productsResponse] = await Promise.all([
          getAdminStatsSummary(), getAdminOrders(), getAdminProducts(),
        ]);
        setSummary(summaryResponse.data?.stats ?? summaryResponse.data ?? null);
        setOrders(ordersResponse.data?.orders ?? []);
        setProducts(productsResponse.data?.products ?? []);
      } catch (fetchError) {
        console.error("Failed to load admin dashboard:", fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const dashboard = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (range - 1));
    const days = Array.from({ length: range }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return { date, orders: 0, revenue: 0 };
    });
    const dayIndex = new Map(days.map((day, index) => [day.date.toDateString(), index]));
    const statuses = new Map<string, number>();
    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      if (Number.isNaN(createdAt.getTime())) return;
      const index = dayIndex.get(createdAt.toDateString());
      const amount = numberValue(order.totalAmount ?? order.total);
      if (index !== undefined) { days[index].orders += 1; days[index].revenue += amount; }
      const status = order.status || "לא ידוע";
      statuses.set(status, (statuses.get(status) ?? 0) + 1);
    });
    const rangeOrders = days.reduce((total, day) => total + day.orders, 0);
    const rangeRevenue = days.reduce((total, day) => total + day.revenue, 0);
    return { days, statuses: [...statuses.entries()], rangeOrders, rangeRevenue, maxRevenue: Math.max(...days.map((day) => day.revenue), 1) };
  }, [orders, range]);

  if (loading) return <div className="dashboard-state">טוען נתוני ניהול...</div>;
  if (error) return <div className="dashboard-state">לא ניתן היה לטעון את נתוני הניהול.</div>;

  const totalUsers = numberValue(summary?.users?.total);
  const totalSales = numberValue(summary?.sales?.total);
  const activeProducts = numberValue(summary?.inventory?.activeProducts) || products.filter((product) => product.isActive !== false).length;
  const openOrders = numberValue(summary?.orders?.open);
  const lowStock = products.filter((product) => numberValue(product.stock) > 0 && numberValue(product.stock) <= 5).length;
  const outOfStock = products.filter((product) => numberValue(product.stock) === 0).length;
  const averageOrder = dashboard.rangeOrders ? dashboard.rangeRevenue / dashboard.rangeOrders : 0;
  const statusTotal = dashboard.statuses.reduce((total, [, count]) => total + count, 0) || 1;

  return (
    <section className="analytics-dashboard" dir="rtl">
      <div className="analytics-header">
        <div><p className="analytics-kicker">תמונת מצב עסקית</p><h2>סטטיסטיקות ומכירות</h2><p>נתונים מעודכנים לפי הפעילות באתר.</p></div>
        <div className="date-range" aria-label="טווח תאריכים">
          {[7, 30, 90].map((days) => <button key={days} className={range === days ? "active" : ""} onClick={() => setRange(days as 7 | 30 | 90)}>{days} ימים</button>)}
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard label="הכנסות בתקופה" value={formatMoney(dashboard.rangeRevenue)} hint={`${dashboard.rangeOrders} הזמנות`} accent="blue" />
        <MetricCard label="ממוצע להזמנה" value={formatMoney(averageOrder)} hint={`ב־${range} הימים האחרונים`} accent="purple" />
        <MetricCard label="לקוחות רשומים" value={totalUsers.toLocaleString("he-IL")} hint="סה״כ משתמשים" accent="green" />
        <MetricCard label="הזמנות פתוחות" value={openOrders.toLocaleString("he-IL")} hint="דורשות טיפול" accent="orange" />
      </div>

      <div className="analytics-grid">
        <article className="analytics-panel revenue-panel">
          <div className="panel-heading"><h3>הכנסות לפי יום</h3><p>{formatMoney(dashboard.rangeRevenue)} בתקופה הנבחרת</p></div>
          <div className="bar-chart" role="img" aria-label="גרף הכנסות יומי">
            {dashboard.days.map((day) => <div className="bar-column" key={day.date.toISOString()} title={`${day.date.toLocaleDateString("he-IL")}: ${formatMoney(day.revenue)}`}>
              <span className="bar-value">{day.revenue ? formatMoney(day.revenue) : ""}</span><div className="bar-track"><div className="bar-fill" style={{ height: `${(day.revenue / dashboard.maxRevenue) * 100}%` }} /></div><span className="bar-label">{day.date.toLocaleDateString("he-IL", { day: "numeric", month: "numeric" })}</span>
            </div>)}
          </div>
        </article>
        <article className="analytics-panel status-panel">
          <div className="panel-heading"><h3>פילוח סטטוס הזמנות</h3><p>כל ההזמנות שהתקבלו</p></div>
          {dashboard.statuses.length ? <div className="status-list">{dashboard.statuses.map(([status, count]) => <div className="status-row" key={status}>
            <div><span className="status-dot" /><span>{status}</span></div><strong>{count}</strong><div className="status-progress"><span style={{ width: `${(count / statusTotal) * 100}%` }} /></div>
          </div>)}</div> : <p className="empty-chart">אין עדיין הזמנות להצגה.</p>}
        </article>
      </div>

      <div className="operations-grid">
        <OperationCard label="מוצרים פעילים" value={activeProducts.toString()} hint="זמינים בחנות" />
        <OperationCard label="מלאי נמוך" value={lowStock.toString()} hint="עד 5 יחידות במלאי" type="warning" />
        <OperationCard label="אזל מהמלאי" value={outOfStock.toString()} hint="מוצרים שדורשים חידוש" type="danger" />
        <OperationCard label="סה״כ מכירות" value={formatMoney(totalSales)} hint="מאז פתיחת החנות" />
      </div>
    </section>
  );
}

function MetricCard({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {
  return <article className={`metric-card ${accent}`}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}
function OperationCard({ label, value, hint, type = "" }: { label: string; value: string; hint: string; type?: string }) {
  return <article className={`operations-card ${type}`}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}

export default StatsCards;
