"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState<any>({ name: '', slug: '', img: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await (supabase.from('categories') as any).select('*');
    if (data) setCategories(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await (supabase.from('categories') as any)
      .insert([newCat])
      .select();

    if (!error) {
      setCategories([...categories, data[0]]);
      setIsModalOpen(false);
      setNewCat({ name: '', slug: '', img: '' });
    } else {
      alert('Error: ' + error.message);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await (supabase.from('categories') as any).delete().eq('id', id);
    if (!error) setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)' }}>Collections Management</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          <Plus size={16} style={{ marginRight: '0.5rem' }} /> Add Collection
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px' }}>
              <h2>Add New Collection</h2>
              <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input required placeholder="Name" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                <input required placeholder="Slug" value={newCat.slug} onChange={e => setNewCat({...newCat, slug: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                <input required placeholder="Image URL" value={newCat.img} onChange={e => setNewCat({...newCat, img: e.target.value})} style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1 }}>Add</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ background: 'white', borderRadius: '8px', padding: '1rem', border: '1px solid #eee' }}>
        {loading ? <Loader2 className="spin" style={{ margin: '2rem auto', display: 'block' }} /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={cat.img} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600' }}>{cat.name}</span>
                  <button onClick={() => handleDelete(cat.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
