import React from 'react';

export default function CategoriesPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Categories Management</h1>
        <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px' }}>+ Add Category</button>
      </div>
      <p style={{ color: 'var(--color-gray)' }}>Organize your collections and collections structure here.</p>
    </div>
  );
}
