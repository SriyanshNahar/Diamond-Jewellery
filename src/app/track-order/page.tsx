import React from 'react';

export default function TrackOrderPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Track Order</h1>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Enter Order ID" style={{ padding: '1rem', border: '1px solid var(--color-gray-light)', flex: 1 }} />
          <button className="btn-primary">Track</button>
        </div>
      </div>
    </div>
  );
}
