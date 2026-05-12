import React from 'react';

export default function FAQPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8 }}>Find answers to common questions about our diamonds, ordering process, and care guidelines below.</p>
      </div>
    </div>
  );
}
