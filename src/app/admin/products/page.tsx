import React from 'react';

export default function ProductsPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Jewellery Management</h1>
        <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px' }}>+ Add Jewellery</button>
      </div>
      <p style={{ color: 'var(--color-gray)' }}>Manage your diamond rings, necklaces, earrings, and other products here.</p>
    </div>
  );
}
