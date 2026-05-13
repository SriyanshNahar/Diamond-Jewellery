"use client";

import React, { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Mail, Phone, Calendar, IndianRupee, Diamond, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CustomRequestDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      const { data } = await supabase
        .from('custom_requests')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (data) setRequest(data);
      setLoading(false);
    };
    fetchRequest();
  }, [params.id]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Loader2 className="spin" size={48} color="var(--color-gold-dark)" />
    </div>
  );

  if (!request) return <div style={{ padding: '5rem', textAlign: 'center' }}>Request not found</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fdfcfb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/custom-requests" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'white', borderRadius: '8px', border: '1px solid #eee', color: '#666', textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
          <ArrowLeft size={16} /> Back to Requests
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Left Side: Customer Details */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', height: 'fit-content' }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '2rem', color: '#1a1a1a' }}>Customer Details</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Full Name</p>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>{request.full_name}</h3>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem', background: '#fcf8f1', borderRadius: '8px', color: 'var(--color-gold-dark)' }}><Phone size={18} /></div>
              <div>
                <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Phone</p>
                <p style={{ fontWeight: '500' }}>{request.phone}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem', background: '#f5f7ff', borderRadius: '8px', color: '#4f46e5' }}><Mail size={18} /></div>
              <div>
                <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Email</p>
                <p style={{ fontWeight: '500' }}>{request.email}</p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#fafafa', borderRadius: '12px', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <IndianRupee size={20} color="#16a34a" />
                <div>
                  <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase' }}>Estimated Budget</p>
                  <p style={{ fontWeight: '600', color: '#16a34a' }}>{request.estimated_budget}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Diamond size={20} color="var(--color-gold-dark)" />
                <div>
                  <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase' }}>Metal Preference</p>
                  <p style={{ fontWeight: '600' }}>{request.metal_preference}</p>
                </div>
              </div>
            </div>

            <div>
              <p style={{ color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Status</p>
              <span style={{ padding: '0.4rem 1rem', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                {request.status.toUpperCase()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Inspiration Images & Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Design Inspiration</h2>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #f0f0f0', color: '#666', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <MessageSquare size={18} style={{ marginTop: '0.2rem', color: 'var(--color-gold-dark)' }} />
                <span style={{ fontWeight: '600', color: '#333' }}>Description:</span>
              </div>
              <p style={{ paddingLeft: '1.8rem' }}>{request.design_description}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {request.image_urls && Array.isArray(request.image_urls) && request.image_urls.length > 0 ? (
              request.image_urls.map((url: string, idx: number) => (
                <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                  <img 
                    src={url} 
                    alt={`Inspiration ${idx + 1}`} 
                    style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', display: 'block' }} 
                  />
                  <p style={{ textAlign: 'center', marginTop: '1rem', color: '#999', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Design {idx + 1}</p>
                </div>
              ))
            ) : request.image_url ? (
              <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <img 
                  src={request.image_url} 
                  alt="Design Inspiration" 
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }} 
                />
                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#999', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Single Inspiration Image</p>
              </div>
            ) : (
              <div style={{ padding: '4rem', background: '#f5f5f5', borderRadius: '16px', textAlign: 'center', color: '#999', border: '2px dashed #eee', gridColumn: 'span 2' }}>
                No images provided by customer
              </div>
            )}
          </div>
        </motion.div>

      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
