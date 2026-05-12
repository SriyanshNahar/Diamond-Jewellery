import React from 'react';

export default function TermsPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Terms of Service</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8 }}>Please review our terms of service regarding purchases, custom designs, and warranties.</p>
      </div>
    </div>
  );
}
