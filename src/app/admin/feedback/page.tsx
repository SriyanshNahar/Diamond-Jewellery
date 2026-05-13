"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Star, MessageCircle } from 'lucide-react';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data } = await supabase.from('feedbacks').select('*').order('created_at', { ascending: false });
      if (data) setFeedbacks(data);
      setLoading(false);
    };
    fetchFeedback();
  }, []);

  const toggleApproval = async (id: any, currentStatus: boolean) => {
    const { error } = await (supabase.from('feedbacks') as any)
      .update({ is_approved: !currentStatus })
      .eq('id', id);
    
    if (!error) {
      setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, is_approved: !currentStatus } : f));
    }
  };

  const deleteFeedback = async (id: any) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    const { error } = await (supabase.from('feedbacks') as any).delete().eq('id', id);
    if (!error) setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>⭐ Customer Feedback & Reviews</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {loading ? <Loader2 className="spin" style={{ margin: '4rem auto', display: 'block' }} /> : (
          feedbacks.map(f => (
            <div key={f.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold', display: 'block' }}>{f.customer_name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#999' }}>{new Date(f.created_at).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < f.rating ? "#D4AF37" : "none"} color={i < f.rating ? "#D4AF37" : "#ddd"} />
                  ))}
                </div>
              </div>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{f.comment}"</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <button 
                  onClick={() => toggleApproval(f.id, f.is_approved)}
                  style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    borderRadius: '4px', 
                    border: 'none', 
                    background: f.is_approved ? '#fef2f2' : '#f0fdf4', 
                    color: f.is_approved ? '#991b1b' : '#166534',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  {f.is_approved ? 'Hide from Web' : 'Approve & Show'}
                </button>
                <button 
                  onClick={() => deleteFeedback(f.id)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #eee', color: '#666', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
              
              {f.is_approved && (
                <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#166534', color: 'white', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>LIVE</div>
              )}
            </div>
          ))
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
