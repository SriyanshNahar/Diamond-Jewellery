import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.topHeader}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search admin..." />
          </div>
          <div className={styles.adminProfile}>
            <div className={styles.avatar}>A</div>
            <span>Admin</span>
          </div>
        </div>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
