"use client";

import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, IndianRupee, Clock, MessageSquare, PenTool, TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentInventory, setRecentInventory] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Fetch real data from Supabase
    const { data: orders } = await (supabase.from('orders') as any).select('*');
    const { count: productCount } = await (supabase.from('products') as any).select('*', { count: 'exact', head: true });
    const { count: requestCount } = await (supabase.from('custom_requests') as any).select('*', { count: 'exact', head: true });
    const { count: feedbackCount } = await (supabase.from('feedbacks') as any).select('*', { count: 'exact', head: true });

    const totalRevenue = (orders || []).reduce((acc: number, curr: any) => acc + (curr.total_amount || 0), 0);
    const pendingOrdersCount = (orders || []).filter((o: any) => o.status?.toLowerCase() === 'pending').length;

    const newStats = [
      { id: 1, title: 'Total Revenue', value: `₹ ${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee },
      { id: 2, title: 'Total Orders', value: (orders || []).length.toString(), icon: ShoppingCart },
      { id: 3, title: 'Total Products', value: (productCount || 0).toString(), icon: Package },
      { id: 4, title: 'Pending Orders', value: pendingOrdersCount.toString(), icon: Clock },
      { id: 5, title: 'Design Requests', value: (requestCount || 0).toString(), icon: PenTool },
      { id: 6, title: 'Customer Feedback', value: (feedbackCount || 0).toString(), icon: MessageSquare },
    ];

    setStats(newStats);

    // Fetch recent inventory
    const { data: products } = await (supabase.from('products') as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentInventory(products || []);

    setLoading(false);
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
      <Loader2 className="spin" size={48} color="var(--color-gold-dark)" />
      <p style={{ color: '#666' }}>Fetching real-time analytics...</p>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Analytics</h1>
          <p className={styles.subtitle}>Live performance overview of Aura Fine Jewellery.</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map(stat => {
          const Icon = stat.icon;
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
                <span className={styles.trend} style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} />
                  Live Sync Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.sectionsGrid}>
        {/* Recent Inventory Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Inventory</h3>
            <button className={styles.btnLink} onClick={() => window.location.href='/admin/products'}>View All Products</button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInventory.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td></tr>
                ) : recentInventory.map(product => (
                  <tr key={product.id}>
                    <td className={styles.productName}>{product.name}</td>
                    <td>₹ {product.price.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        (product.stock || 0) > 10 ? styles.badgeSuccess : 
                        (product.stock || 0) > 0 ? styles.badgeWarning : styles.badgeDanger
                      }`}>
                        {(product.stock || 0) > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Sales Performance</h3>
          </div>
          <div className={styles.chartPlaceholder} style={{ background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#999' }}>
               <IndianRupee size={48} style={{ marginBottom: '1rem', opacity: 0.1 }} />
               <p style={{ fontSize: '0.9rem' }}>Detailed sales charts will generate <br /> as order volume increases.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
