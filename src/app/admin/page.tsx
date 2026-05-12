import React from 'react';
import { Package, ShoppingCart, IndianRupee, Clock, MessageSquare, PenTool } from 'lucide-react';
import styles from './page.module.css';

const stats = [
  { id: 1, title: 'Total Revenue', value: '₹ 12,45,000', icon: IndianRupee, trend: '+15%' },
  { id: 2, title: 'Total Orders', value: '142', icon: ShoppingCart, trend: '+8%' },
  { id: 3, title: 'Total Products', value: '86', icon: Package, trend: '0%' },
  { id: 4, title: 'Pending Orders', value: '12', icon: Clock, trend: '-5%' },
  { id: 5, title: 'Design Requests', value: '8', icon: PenTool, trend: '+20%' },
  { id: 6, title: 'New Feedback', value: '24', icon: MessageSquare, trend: '+12%' },
];

const bestSellers = [
  { id: 'ORD-001', name: 'Eternity Diamond Band', category: 'Rings', sales: 45, revenue: '₹ 20,25,000', status: 'In Stock' },
  { id: 'ORD-002', name: 'Royal Solitaire Necklace', category: 'Necklaces', sales: 28, revenue: '₹ 35,00,000', status: 'Low Stock' },
  { id: 'ORD-003', name: 'Diamond Tennis Bracelet', category: 'Bangles', sales: 32, revenue: '₹ 91,20,000', status: 'In Stock' },
  { id: 'ORD-004', name: 'Vintage Rose Cut Earrings', category: 'Earrings', sales: 18, revenue: '₹ 11,70,000', status: 'Out of Stock' },
];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Overview</h1>
          <p className={styles.subtitle}>Welcome back to Aura Admin. Here's what's happening today.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>+ Add Product</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map(stat => {
          const Icon = stat.icon;
          const isPositive = stat.trend.startsWith('+');
          return (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div>
                  <p className={styles.statTitle}>{stat.title}</p>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                </div>
                <div className={styles.iconBox}>
                  <Icon size={24} />
                </div>
              </div>
              <div className={styles.statFooter}>
                <span className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
                  {stat.trend} from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables Section */}
      <div className={styles.sectionsGrid}>
        {/* Best Sellers */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Best Selling Products</h3>
            <button className={styles.btnLink}>View All</button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bestSellers.map(product => (
                  <tr key={product.id}>
                    <td className={styles.productName}>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.sales}</td>
                    <td>{product.revenue}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        product.status === 'In Stock' ? styles.badgeSuccess : 
                        product.status === 'Low Stock' ? styles.badgeWarning : styles.badgeDanger
                      }`}>
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity / Chart Placeholder */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Revenue Analytics</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.bars}>
              <div className={styles.bar} style={{ height: '40%' }}></div>
              <div className={styles.bar} style={{ height: '60%' }}></div>
              <div className={styles.bar} style={{ height: '35%' }}></div>
              <div className={styles.bar} style={{ height: '80%' }}></div>
              <div className={styles.bar} style={{ height: '55%' }}></div>
              <div className={styles.bar} style={{ height: '90%' }}></div>
              <div className={styles.bar} style={{ height: '70%' }}></div>
            </div>
            <p className={styles.chartCaption}>Showing revenue trend for the last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
