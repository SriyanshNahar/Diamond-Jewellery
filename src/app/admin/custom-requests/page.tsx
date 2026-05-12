import React from 'react';
import Link from 'next/link';

const requests = [
  { id: 1, name: 'Sriyansh Nahar', phone: '8302181553', type: 'Diamond Ring', date: '10 May 2026' },
  { id: 2, name: 'Priya Sharma', phone: '9876543210', type: 'Necklace', date: '11 May 2026' }
];

export default function CustomRequestsPage() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>🧵 Custom Design Studio</h1>
      </div>
      
      <div style={{ background: 'var(--color-white)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Phone</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Jewellery</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.name}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.phone}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.type}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{req.date}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>
                  <Link href={`/admin/custom-requests/${req.id}`} style={{ padding: '0.4rem 0.8rem', background: '#1f2937', color: 'white', borderRadius: '4px', marginRight: '0.5rem', fontSize: '0.8rem', textDecoration: 'none' }}>View</Link>
                  <button style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', borderRadius: '4px', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
