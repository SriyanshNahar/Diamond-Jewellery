"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, User, Mail, Phone, MessageSquare, Trash2 } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (data) setCustomers(data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (!error) {
        setCustomers(prev => prev.filter(c => c.id !== id));
      } else {
        alert('Failed to delete the message.');
      }
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>👥 Customer Inquiries</h1>
      <div style={{ background: 'white', borderRadius: '8px', padding: '1rem', border: '1px solid #eee' }}>
        {loading ? <Loader2 className="spin" style={{ margin: '4rem auto', display: 'block' }} /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Contact</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Message</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Date</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>{c.name}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={12} /> {c.email}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={12} /> {c.phone}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9', fontSize: '0.9rem', maxWidth: '300px' }}>
                    <strong>{c.subject}</strong>: {c.message}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9', fontSize: '0.85rem' }}>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #f9f9f9', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        transition: 'background 0.2s',
                      }}
                      title="Delete Message"
                      onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Trash2 size={18} />
                    </button>
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
