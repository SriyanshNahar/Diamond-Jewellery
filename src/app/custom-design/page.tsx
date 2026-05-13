"use client";

import React, { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CustomDesignPage() {
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    metal: '18K Yellow Gold',
    budget: '₹ 50,000 - ₹ 1,00,000',
    description: ''
  });

  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `custom-designs/${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      const newImages = [...images];
      newImages[index] = publicUrl;
      setImages(newImages);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const { error } = await (supabase.from('custom_requests') as any).insert([{
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      metal_preference: formData.metal,
      estimated_budget: formData.budget,
      design_description: formData.description,
      image_urls: images.filter(img => img !== null),
      status: 'pending'
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      alert('Error submitting request: ' + error.message);
    }
    setUploading(false);
  };

  if (submitted) {
    return (
      <div style={{ padding: '10rem 2rem', textAlign: 'center', minHeight: '100vh', background: '#fdfcfb' }}>
        <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 2rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Request Received</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Our master artisans will review your dream design and contact you within 24 hours.</p>
        <button className="btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10rem 2rem 5rem', minHeight: '100vh', background: '#fdfcfb' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Side: Upload Grid */}
          <div style={{ flex: '1.2 1 300px', background: 'white', padding: 'clamp(1.2rem, 4vw, 2.5rem)', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '2rem', color: '#1a1a1a' }}>Upload Your Designs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1.5rem' }}>
              {images.map((img, index) => (
                <div key={index} style={{ 
                  position: 'relative', 
                  aspectRatio: '1', 
                  border: '2px dashed #e0e0e0', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa',
                  transition: 'all 0.3s ease',
                  gridColumn: index === 4 ? '1 / -1' : 'auto'
                }}>
                  {img ? (
                    <img src={img} alt={`Design ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <label style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.9rem' }}>
                      <Upload size={24} style={{ marginBottom: '0.8rem', opacity: 0.6 }} />
                      <span style={{ fontWeight: '500', textAlign: 'center', fontSize: '0.8rem' }}>Design {index + 1}</span>
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#999', textAlign: 'center' }}>You can upload up to 5 sketches or inspiration photos.</p>
          </div>

          {/* Right Side: Form Details */}
          <div style={{ flex: '1 1 300px', background: 'white', padding: 'clamp(1.2rem, 4vw, 2.5rem)', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '2rem', color: '#1a1a1a' }}>Your Custom Design Details</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Full Name</label>
                <input required placeholder="Enter your name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Mobile Number</label>
                <input required placeholder="Enter your phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Email Address</label>
                <input required placeholder="Enter your email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Metal Preference</label>
                <select value={formData.metal} onChange={e => setFormData({...formData, metal: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem' }}>
                  <option>18K Yellow Gold</option>
                  <option>18K Rose Gold</option>
                  <option>18K White Gold</option>
                  <option>Platinum</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Estimated Budget</label>
                <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem' }}>
                  <option>₹ 20,000 - ₹ 50,000</option>
                  <option>₹ 50,000 - ₹ 1,00,000</option>
                  <option>₹ 1,00,000 - ₹ 5,00,000</option>
                  <option>Above ₹ 5,00,000</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#666' }}>Design Description</label>
                <textarea required placeholder="Describe your dream jewellery piece..." rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '0.9rem', border: '1px solid #eee', borderRadius: '8px', background: '#fcfcfc', fontSize: '1rem', resize: 'none' }} />
              </div>
              
              <button type="submit" disabled={uploading} className="btn-primary" style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1rem', fontWeight: '600', letterSpacing: '1px' }}>
                {uploading ? 'Processing...' : 'Submit Design Request'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
