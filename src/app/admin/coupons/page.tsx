import React from 'react';

export default function CouponsPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Coupon Management</h1>
        <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px' }}>+ Generate Coupon</button>
      </div>
      <p style={{ color: 'var(--color-gray)' }}>Create promotional codes and discount campaigns.</p>
    </div>
  );
}
