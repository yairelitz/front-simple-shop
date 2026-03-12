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

  return (<>

  <h2>סיכום</h2>
    
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
        <h3>משתמשים</h3>
        <p>{stats.stats.users.total}</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
        <h3>הזמנות</h3>
        <p>{stats.stats.orders.open}</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
        <h3>סה"כ מכירות</h3>
        <p>₪ {stats.stats.sales.total}</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
        <h3>מוצרים בחנות</h3>
        <p>{stats.stats.inventory.activeProducts}</p>
      </div>
    </div>
    </>
  );
}

export default StatsCards;