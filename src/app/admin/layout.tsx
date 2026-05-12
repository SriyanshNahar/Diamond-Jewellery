import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <AdminGuard>
          {children}
        </AdminGuard>
      </main>
    </div>
  );
}
