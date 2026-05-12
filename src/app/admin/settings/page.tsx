import React from 'react';

export default function SettingsPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Store Settings</h1>
      </div>
      <p style={{ color: 'var(--color-gray)' }}>Configure tax rates, shipping zones, payment gateways, and admin roles.</p>
    </div>
  );
}
