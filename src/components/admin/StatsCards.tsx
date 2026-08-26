import { useEffect, useState } from "react";
import { getAdminStatsSummary } from "../../services/admin.service";
// types/stats.ts
export interface StatsSummary {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  stats: string
}
function StatsCards() {

  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStatsSummary();
        setStats(data.data);
        console.log(data.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  if (!stats) return <div>No stats available</div>;

return (
  <div className="admin-stats">
    {/* <h2 className="admin-stats-title">סיכום</h2> */}

    <div className="stats-container">
      <div className="stat-card">
        <h3>כמות משתמשים</h3>
        <p>{stats.stats.users.total}</p>
      </div>

      <div className="stat-card">
        <h3>מספר הזמנות</h3>
        <p>{stats.stats.orders.open}</p>
      </div>

      <div className="stat-card">
        <h3>סה"כ מכירות</h3>
        <p>₪ {stats.stats.sales.total}</p>
      </div>

      <div className="stat-card">
        <h3>מוצרים בחנות</h3>
        <p>{stats.stats.inventory.activeProducts}</p>
      </div>
    </div>
  </div>
);
}

export default StatsCards;