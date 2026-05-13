"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, ToggleLeft, ToggleRight, Upload, Monitor, Tablet, Smartphone, CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function BannerManagement() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    link: '',
    desktop_image_url: '',
    tablet_image_url: '',
    mobile_image_url: '',
  });

  const [uploadStatus, setUploadStatus] = useState({
    desktop: '',
    tablet: '',
    mobile: '',
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data } = await (supabase.from('banners') as any)
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setBanners(data);
    setLoading(false);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: 'desktop' | 'tablet' | 'mobile'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(prev => ({ ...prev, [slot]: 'uploading' }));
    const fileName = `banners/${slot}-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      setForm(prev => ({ ...prev, [`${slot}_image_url`]: publicUrl }));
      setUploadStatus(prev => ({ ...prev, [slot]: 'done' }));
    } else {
      setUploadStatus(prev => ({ ...prev, [slot]: 'error' }));
      alert('Upload failed: ' + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.desktop_image_url && !form.tablet_image_url && !form.mobile_image_url) {
      alert('Please upload at least one banner image.');
      return;
    }
    setSaving(true);

    // Use desktop image as fallback for image_url (legacy field)
    const image_url = form.desktop_image_url || form.tablet_image_url || form.mobile_image_url;

    const { error } = await (supabase.from('banners') as any).insert([{
      title: form.title,
      subtitle: form.subtitle,
      link: form.link,
      image_url,
      desktop_image_url: form.desktop_image_url,
      tablet_image_url: form.tablet_image_url,
      mobile_image_url: form.mobile_image_url,
      is_active: true,
    }]);

    if (!error) {
      setSaved(true);
      setForm({ title: '', subtitle: '', link: '', desktop_image_url: '', tablet_image_url: '', mobile_image_url: '' });
      setUploadStatus({ desktop: '', tablet: '', mobile: '' });
      fetchBanners();
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert('Error: ' + error.message);
    }
    setSaving(false);
  };

  const toggleBanner = async (id: any, currentStatus: boolean) => {
    await (supabase.from('banners') as any).update({ is_active: !currentStatus }).eq('id', id);
    setBanners(banners.map(b => b.id === id ? { ...b, is_active: !currentStatus } : b));
  };

  const deleteBanner = async (id: any) => {
    if (!confirm('Delete this banner?')) return;
    await (supabase.from('banners') as any).delete().eq('id', id);
    setBanners(banners.filter(b => b.id !== id));
  };

  const UploadSlot = ({
    label,
    slot,
    icon: Icon,
    description,
    recommended,
  }: {
    label: string;
    slot: 'desktop' | 'tablet' | 'mobile';
    icon: any;
    description: string;
    recommended: string;
  }) => {
    const url = form[`${slot}_image_url` as keyof typeof form];
    const status = uploadStatus[slot];

    return (
      <div style={{
        border: `2px dashed ${url ? '#10b981' : '#ddd'}`,
        borderRadius: '12px',
        padding: '1.5rem',
        background: url ? '#f0fdf4' : '#fafafa',
        transition: 'all 0.3s ease',
        flex: 1,
        minWidth: '200px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <Icon size={20} color={url ? '#10b981' : '#888'} />
          <strong style={{ fontSize: '0.95rem', color: url ? '#166534' : '#333' }}>{label}</strong>
          {url && <CheckCircle size={16} color="#10b981" />}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.3rem' }}>{description}</p>
        <p style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '1rem' }}>Recommended: {recommended}</p>

        {url ? (
          <div style={{ position: 'relative', width: '100%', height: '100px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.8rem' }}>
            <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : null}

        <label style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'white', border: '1px solid #ddd', borderRadius: '8px',
          padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.85rem',
          color: '#555', justifyContent: 'center', transition: 'all 0.2s',
        }}>
          {status === 'uploading' ? (
            <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Uploading...</>
          ) : (
            <><Upload size={16} /> {url ? 'Change Image' : 'Upload Image'}</>
          )}
          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, slot)} style={{ display: 'none' }} />
        </label>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', marginBottom: '0.3rem' }}>🎊 Banner Management</h1>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Upload responsive banners for desktop, tablet & mobile screens. Active banners appear on your homepage hero.</p>
      </div>

      {/* Add New Banner Form */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #eee', padding: '2rem', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-black)', borderBottom: '2px solid var(--color-gold)', paddingBottom: '0.5rem', display: 'inline-block' }}>
          Add New Banner
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Text Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#555', fontWeight: '500' }}>Banner Title *</label>
              <input
                required
                placeholder="e.g. Diwali Sale"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#555', fontWeight: '500' }}>Subtitle</label>
              <input
                placeholder="e.g. Up to 50% Off on all Diamonds"
                value={form.subtitle}
                onChange={e => setForm({ ...form, subtitle: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#555', fontWeight: '500' }}>Link (optional)</label>
              <input
                placeholder="e.g. /category/diamonds"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Responsive Image Upload Slots */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.85rem', color: '#555', fontWeight: '500' }}>
              Responsive Banner Images <span style={{ color: '#aaa', fontWeight: 'normal' }}>(Upload for each screen size)</span>
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <UploadSlot
                label="Desktop"
                slot="desktop"
                icon={Monitor}
                description="Landscape format for laptop & PC screens"
                recommended="1920 × 600 px"
              />
              <UploadSlot
                label="Tablet"
                slot="tablet"
                icon={Tablet}
                description="Landscape/portrait for iPad screens"
                recommended="1024 × 500 px"
              />
              <UploadSlot
                label="Mobile"
                slot="mobile"
                icon={Smartphone}
                description="Portrait format for smartphone screens"
                recommended="750 × 900 px"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{ padding: '0.8rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : '+ Add Banner'}
            </button>
            {saved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', background: '#dcfce7', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                <CheckCircle size={16} /> Banner added successfully!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Existing Banners */}
      <div>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '1.2rem' }}>Active & Inactive Banners ({banners.length})</h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
            <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        ) : banners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', border: '1px solid #eee', color: '#aaa' }}>
            No banners yet. Add your first banner above.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {banners.map(banner => (
              <div key={banner.id} style={{ background: 'white', borderRadius: '12px', border: `1px solid ${banner.is_active ? '#bbf7d0' : '#eee'}`, overflow: 'hidden', transition: 'all 0.3s ease' }}>
                {/* Banner Preview */}
                <div style={{ position: 'relative', width: '100%', height: '160px', background: '#f5f5dc', overflow: 'hidden' }}>
                  {(banner.desktop_image_url || banner.image_url) ? (
                    <img
                      src={banner.desktop_image_url || banner.image_url}
                      alt={banner.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                      No Preview
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: banner.is_active ? '#166534' : '#999', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600' }}>
                    {banner.is_active ? 'LIVE' : 'INACTIVE'}
                  </div>
                </div>

                {/* Screen Images Available */}
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.6rem 1rem', background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                  <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: banner.desktop_image_url ? '#166534' : '#ccc' }}>
                    <Monitor size={12} /> Desktop
                  </span>
                  <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: banner.tablet_image_url ? '#166534' : '#ccc' }}>
                    <Tablet size={12} /> Tablet
                  </span>
                  <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: banner.mobile_image_url ? '#166534' : '#ccc' }}>
                    <Smartphone size={12} /> Mobile
                  </span>
                </div>

                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem', color: 'var(--color-black)' }}>{banner.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>{banner.subtitle || 'No subtitle'}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => toggleBanner(banner.id, banner.is_active)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', color: banner.is_active ? '#166534' : '#999', fontSize: '0.85rem', fontWeight: '500' }}
                    >
                      {banner.is_active ? <ToggleRight size={28} color="#166534" /> : <ToggleLeft size={28} color="#aaa" />}
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
