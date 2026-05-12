"use client";

import React, { useState } from 'react';
import { Upload, FileDown, Plus, Edit, Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialMockProducts = [
  { id: 1, name: 'Eternity Diamond Band', category: 'Rings', price: '₹ 45,000', stock: 12 },
  { id: 2, name: 'Royal Solitaire', category: 'Rings', price: '₹ 1,25,000', stock: 4 },
];

export default function ProductsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleBulkUpload = () => {
    setIsUploading(true);
    setUploadSuccess(false);
    
    // Simulate parsing the file and uploading
    setTimeout(() => {
      setUploadedCount(Math.floor(Math.random() * 50) + 10); // Random number between 10 and 60
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setUploadSuccess(false), 5000);
    }, 2500); // 2.5 seconds loading animation
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Jewellery Management</h1>
        <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add Single Product
        </button>
      </div>

      {/* Bulk Upload Section */}
      <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-black)', marginBottom: '1.5rem' }}>Bulk Upload Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          <div style={{ border: '1px dashed var(--color-gray)', padding: '2rem', textAlign: 'center', borderRadius: '4px' }}>
            <FileDown size={32} style={{ color: 'var(--color-gold-dark)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Upload Product Data (CSV/Excel)</h3>
            <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '1rem' }}>Ensure column headers match exactly.</p>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
          </div>

          <div style={{ border: '1px dashed var(--color-gray)', padding: '2rem', textAlign: 'center', borderRadius: '4px' }}>
            <Upload size={32} style={{ color: 'var(--color-gold-dark)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Upload Product Images (ZIP)</h3>
            <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '1rem' }}>Image names must match Product ID/Name.</p>
            <input type="file" accept=".zip" />
          </div>
          
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ flex: 1 }}>
            <AnimatePresence>
              {isUploading && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}
                >
                  <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                  <span>Processing and uploading data to database...</span>
                </motion.div>
              )}
              {uploadSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', background: '#dcfce7', padding: '0.5rem 1rem', borderRadius: '4px', width: 'fit-content' }}
                >
                  <CheckCircle2 size={18} />
                  <span>Successfully uploaded <strong>{uploadedCount} new products</strong> to the store!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleBulkUpload}
            disabled={isUploading}
            style={{ padding: '0.6rem 2rem', opacity: isUploading ? 0.7 : 1, cursor: isUploading ? 'not-allowed' : 'pointer' }}
          >
            {isUploading ? 'Uploading...' : 'Process Bulk Upload'}
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ background: 'var(--color-white)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Product Name</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', color: 'var(--color-black)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialMockProducts.map(prod => (
              <tr key={prod.id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{prod.name}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{prod.category}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{prod.price}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)' }}>{prod.stock}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-gray-light)', display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.4rem', background: 'transparent', color: 'var(--color-black)', border: '1px solid var(--color-gray-light)', borderRadius: '4px', cursor: 'pointer' }} aria-label="Edit"><Edit size={16} /></button>
                  <button style={{ padding: '0.4rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer' }} aria-label="Delete"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
