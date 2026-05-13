"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Loader2, Trash2, Eye } from 'lucide-react';

export default function CustomRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('custom_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setRequests(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('custom_requests').delete().eq('id', id);
    if (!error) setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>🧵 Custom Design Studio</h1>
        <button onClick={fetchRequests} style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Refresh</button>
      </div>
      
      <div style={{ background: 'var(--color-white)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}><Loader2 size={32} className="spin" style={{ margin: '0 auto' }} /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Email/Phone</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Preference</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Budget</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.full_name}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>
                    <div style={{ fontSize: '0.85rem' }}>{req.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gray)' }}>{req.phone}</div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.metal_preference}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.estimated_budget}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{new Date(req.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/admin/custom-requests/${req.id}`} style={{ padding: '0.4rem', background: '#1f2937', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                      <Eye size={16} />
                    </Link>
                    <button onClick={() => handleDelete(req.id)} style={{ padding: '0.4rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
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
