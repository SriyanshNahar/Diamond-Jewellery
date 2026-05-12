import React from 'react';
import { DollarSign, ShoppingBag, Users, Eye } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#1A1A1A' }}>Dashboard Overview</h1>
      
      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><DollarSign size={28} /></div>
          <div className={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p>₹ 45.2M</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><ShoppingBag size={28} /></div>
          <div className={styles.statInfo}>
            <h3>Total Orders</h3>
            <p>1,284</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Users size={28} /></div>
          <div className={styles.statInfo}>
            <h3>Total Customers</h3>
            <p>8,405</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Eye size={28} /></div>
          <div className={styles.statInfo}>
            <h3>Store Visits</h3>
            <p>124.5k</p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2>Recent Orders</h2>
          <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>View All</button>
        </div>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD-8092</td>
              <td>Priya Sharma</td>
              <td>Royal Solitaire Ring</td>
              <td>Oct 12, 2023</td>
              <td>₹ 1,25,000</td>
              <td><span className={`${styles.badge} ${styles.pending}`}>Processing</span></td>
            </tr>
            <tr>
              <td>#ORD-8091</td>
              <td>Rahul Verma</td>
              <td>Vintage Rose Cut Necklace</td>
              <td>Oct 11, 2023</td>
              <td>₹ 3,65,000</td>
              <td><span className={`${styles.badge} ${styles.resolved}`}>Shipped</span></td>
            </tr>
            <tr>
              <td>#ORD-8090</td>
              <td>Anita Desai</td>
              <td>Diamond Tennis Bracelet</td>
              <td>Oct 10, 2023</td>
              <td>₹ 2,85,000</td>
              <td><span className={`${styles.badge} ${styles.resolved}`}>Delivered</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
