"use client";

import React, { useState } from 'react';
import { Search, MapPin, Package, CheckCircle2 } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setTracking(true);
    }
  };

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Track Your Order</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, textAlign: 'center', marginBottom: '3rem' }}>Enter your tracking number or order ID below to see the real-time status of your luxury package.</p>
        
        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray)' }} />
            <input 
              type="text" 
              placeholder="e.g. AURA-89472" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', fontSize: '1rem', outline: 'none' }} 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0 2.5rem' }}>Track</button>
        </form>

        {tracking && (
          <div style={{ border: '1px solid var(--color-gray-light)', borderRadius: '8px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-gray-light)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Order Number</p>
                <h4 style={{ color: 'var(--color-black)', fontSize: '1.2rem' }}>{orderId.toUpperCase()}</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Expected Delivery</p>
                <h4 style={{ color: 'var(--color-black)', fontSize: '1.2rem' }}>15 May 2026</h4>
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Timeline Line */}
              <div style={{ position: 'absolute', left: '0.65rem', top: '0', bottom: '0', width: '2px', background: 'var(--color-beige)' }}></div>

              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <CheckCircle2 size={24} style={{ position: 'absolute', left: '-2.7rem', top: '-2px', color: '#10b981', background: 'var(--color-white)' }} />
                <h4 style={{ color: 'var(--color-black)', marginBottom: '0.3rem' }}>Order Confirmed</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>May 10, 2026 - 10:30 AM</p>
              </div>

              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <CheckCircle2 size={24} style={{ position: 'absolute', left: '-2.7rem', top: '-2px', color: '#10b981', background: 'var(--color-white)' }} />
                <h4 style={{ color: 'var(--color-black)', marginBottom: '0.3rem' }}>Craftsmanship & Quality Check</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>May 12, 2026 - 02:15 PM</p>
              </div>

              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Package size={24} style={{ position: 'absolute', left: '-2.7rem', top: '-2px', color: 'var(--color-gold-dark)', background: 'var(--color-white)' }} />
                <h4 style={{ color: 'var(--color-black)', marginBottom: '0.3rem' }}>Dispatched from Vault</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>In Transit via BlueDart Secure Delivery</p>
              </div>

              <div style={{ position: 'relative' }}>
                <MapPin size={24} style={{ position: 'absolute', left: '-2.7rem', top: '-2px', color: 'var(--color-gray-light)', background: 'var(--color-white)' }} />
                <h4 style={{ color: 'var(--color-gray)', marginBottom: '0.3rem' }}>Out for Delivery</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Pending</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
