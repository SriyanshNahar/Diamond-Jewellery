"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Package, Search } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: regularOrders } = await (supabase.from('orders') as any).select('*');
    const { data: customRequests } = await (supabase.from('custom_requests') as any).select('*');
    
    const formattedRegular = (regularOrders || []).map((o: any) => ({ ...o, type: 'Product' }));
    const formattedCustom = (customRequests || []).map((o: any) => ({ 
      ...o, 
      type: 'Custom Design',
      customer_name: o.name,
      customer_email: o.email,
      total_amount: 0, // Custom designs might not have a fixed price yet
      status: o.status || 'pending'
    }));

    const combined = [...formattedRegular, ...formattedCustom].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setOrders(combined);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return { bg: '#dcfce7', text: '#166534' };
      case 'shipped': return { bg: '#dbeafe', text: '#1e40af' };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#fef3c7', text: '#92400e' };
    }
  };

  const updateStatus = async (id: string, type: string, newStatus: string) => {
    const table = type === 'Custom Design' ? 'custom_requests' : 'orders';
    const { error } = await (supabase.from(table) as any).update({ status: newStatus }).eq('id', id);
    if (!error) fetchOrders();
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>🛍️ All Orders & Requests</h1>
        <button onClick={fetchOrders} style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>Refresh</button>
      </div>

      <div style={{ background: 'var(--color-white)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        {loading ? <Loader2 className="spin" style={{ margin: '4rem auto', display: 'block' }} /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-gray)' }}>
                    <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                    <p>No records found.</p>
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: order.type === 'Custom Design' ? '#ede9fe' : '#f1f5f9', color: order.type === 'Custom Design' ? '#5b21b6' : '#475569' }}>
                        {order.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9', fontSize: '0.8rem' }}>#{order.id.toString().slice(0, 8)}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                      <div style={{ fontWeight: '600' }}>{order.customer_name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{order.customer_email}</div>
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                      {order.total_amount > 0 ? `₹ ${order.total_amount.toLocaleString('en-IN')}` : 'TBD'}
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                      <span style={{ 
                        padding: '0.3rem 0.8rem', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        backgroundColor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, order.type, e.target.value)}
                        style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
