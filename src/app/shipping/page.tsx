import React from 'react';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Shipping Policy</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, textAlign: 'center', marginBottom: '4rem' }}>We offer secure, fully-insured shipping across India so your luxury pieces arrive safely.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--color-beige)', padding: '1rem', borderRadius: '50%', color: 'var(--color-gold-dark)' }}><Truck size={24} /></div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Free Standard Shipping</h3>
              <p style={{ color: 'var(--color-gray)', lineHeight: '1.6' }}>We provide complimentary standard shipping on all orders nationwide. Your order will be carefully packaged in our signature unbranded outer box to maintain discretion and security.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--color-beige)', padding: '1rem', borderRadius: '50%', color: 'var(--color-gold-dark)' }}><ShieldCheck size={24} /></div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>100% Insured Delivery</h3>
              <p style={{ color: 'var(--color-gray)', lineHeight: '1.6' }}>Every piece of Aura jewellery is fully insured transit from our vault to your doorstep. A signature and government-issued ID is strictly required upon delivery to ensure maximum security.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--color-beige)', padding: '1rem', borderRadius: '50%', color: 'var(--color-gold-dark)' }}><Clock size={24} /></div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Estimated Delivery Times</h3>
              <p style={{ color: 'var(--color-gray)', lineHeight: '1.6' }}>In-stock items are processed within 24-48 hours and typically arrive within 3-5 business days. Custom bespoke designs require 14-21 days of meticulous craftsmanship before dispatch.</p>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-black)', marginBottom: '1rem', borderTop: '1px solid var(--color-gray-light)', paddingTop: '2rem' }}>International Shipping</h3>
        <p style={{ color: 'var(--color-gray)', lineHeight: '1.6' }}>At this time, we only ship within India directly through our website. For international bespoke orders, please contact our concierge service directly at support@aurajewellery.com.</p>
      </div>
    </div>
  );
}
