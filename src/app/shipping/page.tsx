import React from 'react';

export default function ShippingPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Shipping Policy</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8 }}>We offer free secure shipping across India on all orders. Your luxury items are fully insured during transit.</p>
      </div>
    </div>
  );
}
