import React from 'react';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8 }}>Your privacy is our priority. We employ the highest standards of data security to protect your personal information.</p>
      </div>
    </div>
  );
}
