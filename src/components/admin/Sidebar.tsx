"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gem, 
  Tags, 
  Package, 
  ShoppingCart, 
  PenTool, 
  MessageSquare, 
  Ticket, 
  Image as ImageIcon, 
  Users, 
  LineChart, 
  Settings,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

const sidebarItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Jewellery', path: '/admin/products', icon: Gem },
  { name: 'Categories', path: '/admin/categories', icon: Tags },
  { name: 'Inventory', path: '/admin/inventory', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Custom Designs', path: '/admin/custom-requests', icon: PenTool },
  { name: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
  { name: 'Coupons', path: '/admin/coupons', icon: Ticket },
  { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Analytics', path: '/admin/analytics', icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h2>AURA ADMIN</h2>
      </div>
      
      <nav className={styles.nav}>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href="/admin/settings" className={styles.navItem}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button 
          className={styles.navItem} 
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
          onClick={() => {
            localStorage.removeItem('isAdmin');
            window.location.href = '/';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
