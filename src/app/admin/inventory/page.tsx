"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Package, Save, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('name');
    if (data) setProducts(data);
    setLoading(false);
  };

  const updateStock = async (id: any, newStock: number) => {
    setSavingId(id);
    const { error } = await (supabase.from('products') as any)
      .update({ stock: newStock })
      .eq('id', id);
    
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    } else {
      alert('Error updating stock');
    }
    setSavingId(null);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>📦 Inventory Management</h1>
        <button onClick={fetchInventory} style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>Refresh Stock</button>
      </div>

      <div style={{ background: 'var(--color-white)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        {loading ? <Loader2 className="spin" style={{ margin: '4rem auto', display: 'block' }} /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Current Stock</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid #eee' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={product.img} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                    <input 
                      type="number" 
                      defaultValue={product.stock || 0} 
                      onBlur={(e) => updateStock(product.id, parseInt(e.target.value))}
                      style={{ width: '80px', padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                    {(product.stock || 0) <= 0 ? (
                      <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}><AlertTriangle size={14} /> Out of Stock</span>
                    ) : (product.stock || 0) < 5 ? (
                      <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>Low Stock</span>
                    ) : (
                      <span style={{ color: '#10b981', fontSize: '0.85rem' }}>In Stock</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                    {savingId === product.id ? <Loader2 size={16} className="spin" /> : <Save size={16} color="#666" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
