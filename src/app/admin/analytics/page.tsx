"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, DollarSign, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStockValue: 0,
    totalCategories: 0,
    bestsellerCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      // Fetch Products
      const { data: products } = await supabase.from('products').select('price, stock_count, is_bestseller');
      
      // Fetch Categories
      const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });

      if (products) {
        const prodData = products as any[];
        const totalValue = prodData.reduce((acc, p) => acc + ((p.price || 0) * (p.stock_count || 10)), 0);
        const bestsellers = prodData.filter(p => p.is_bestseller).length;

        setStats({
          totalProducts: products.length,
          totalStockValue: totalValue,
          totalCategories: catCount || 0,
          bestsellerCount: bestsellers
        });
      }
      setLoading(false);
    }
    fetchAnalytics();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading Advanced Analytics...</div>;
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>
          <BarChart style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Advanced Analytics
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#eef2ff', padding: '0.8rem', borderRadius: '8px', color: '#4f46e5' }}><Package size={24} /></div>
            <div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Total Products</p>
              <h3 style={{ fontSize: '1.8rem', color: '#111' }}>{stats.totalProducts}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fdf4ff', padding: '0.8rem', borderRadius: '8px', color: '#c026d3' }}><ShoppingBag size={24} /></div>
            <div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Total Categories</p>
              <h3 style={{ fontSize: '1.8rem', color: '#111' }}>{stats.totalCategories}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#ecfdf5', padding: '0.8rem', borderRadius: '8px', color: '#059669' }}><DollarSign size={24} /></div>
            <div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Inventory Value</p>
              <h3 style={{ fontSize: '1.5rem', color: '#111' }}>{formatPrice(stats.totalStockValue)}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fffbeb', padding: '0.8rem', borderRadius: '8px', color: '#d97706' }}><TrendingUp size={24} /></div>
            <div>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Bestsellers</p>
              <h3 style={{ fontSize: '1.8rem', color: '#111' }}>{stats.bestsellerCount}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' }}>Platform Health</h2>
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ddd' }}>
          <p style={{ color: '#888' }}>Analytics graphs will be rendered here.</p>
        </div>
      </div>
    </div>
  );
}
