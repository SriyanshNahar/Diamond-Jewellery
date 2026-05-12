import React from 'react';

export default function CustomRequestsPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Custom Design Requests</h1>
      </div>
      <p style={{ color: 'var(--color-gray)' }}>Review and respond to bespoke jewellery requests from customers.</p>
    </div>
  );
}
