"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileDown, Plus, Edit, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Papa from 'papaparse';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    let query = (supabase.from('products') as any).select('*');
    
    if (selectedCategoryId) {
      query = query.eq('category_id', selectedCategoryId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategoryId]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await (supabase.from('products') as any)
      .delete()
      .eq('id', id);
    
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert('Error deleting product');
    }
  };

  const [categories, setCategories] = useState<any[]>([]);
  const fetchCategories = async () => {
    const { data } = await (supabase.from('categories') as any).select('*');
    if (data) setCategories(data);
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({
    name: '',
    price: 0,
    images: [],
    is_bestseller: false,
    promo: '',
    rating: 4.5,
    reviews: 120,
    category_id: null,
    stock: 10
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    const newImages = [...newProduct.images];

    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= 5) break;
      
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        newImages.push(publicUrl);
      }
    }
    
    setNewProduct({ ...newProduct, images: newImages });
    setUploadingFile(false);
  };

  const removeImage = (index: number) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter((_: any, i: number) => i !== index)
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    setIsUploading(true);
    
    // Set the first image as the main 'img' for backward compatibility
    const productToInsert = {
      ...newProduct,
      img: newProduct.images[0]
    };

    const { data, error } = await (supabase.from('products') as any)
      .insert([productToInsert])
      .select();

    if (!error) {
      setProducts([data[0], ...products]);
      setIsAddModalOpen(false);
      setNewProduct({
        name: '', price: 0, images: [], is_bestseller: false, promo: '', rating: 4.5, reviews: 120, category_id: null, stock: 10
      });
    } else {
      alert('Error adding product: ' + error.message);
    }
    setIsUploading(false);
  };

  const handleBulkUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert('Please select a CSV file first');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const formattedData: any[] = results.data.map((row: any) => ({
          name: String(row.name || ''),
          price: parseFloat(row.price) || 0,
          old_price: row.old_price ? parseFloat(row.old_price) : null,
          rating: row.rating ? parseFloat(row.rating) : 0,
          reviews: row.reviews ? parseInt(row.reviews) : 0,
          promo: row.promo ? String(row.promo) : null,
          img: String(row.img || '/rings.png'),
          is_bestseller: row.is_bestseller === 'true' || row.is_bestseller === true,
          stock: row.stock ? parseInt(row.stock) : 10
        }));

        const { data, error } = await (supabase.from('products') as any)
          .insert(formattedData)
          .select();

        if (error) {
          setUploadError(error.message);
        } else {
          setUploadedCount(data.length);
          setUploadSuccess(true);
          fetchProducts();
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
        setIsUploading(false);
      },
      error: (error) => {
        setUploadError(error.message);
        setIsUploading(false);
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Product Management</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={selectedCategoryId || ''} 
            onChange={(e) => setSelectedCategoryId(e.target.value || null)}
            style={{ padding: '0.6rem 1rem', borderRadius: '4px', border: '1px solid #ddd', background: 'white' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button onClick={() => setIsAddModalOpen(true)} className="btn-primary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Single Product
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Add New Product</h2>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input required placeholder="Product Name" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                <input type="number" required placeholder="Price (₹)" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
                <select style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={newProduct.category_id || ''} onChange={e => setNewProduct({...newProduct, category_id: parseInt(e.target.value) || null})}>
                  <option value="">Select Collection</option>
                  {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#666' }}>Product Images (Up to 5)</label>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    disabled={uploadingFile || newProduct.images.length >= 5}
                    style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} 
                  />
                  {uploadingFile && <p style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)' }}>Uploading images...</p>}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {newProduct.images.map((url: string, index: number) => (
                      <div key={index} style={{ position: 'relative', width: '60px', height: '60px', border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button" 
                          onClick={() => removeImage(index)}
                          style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <input placeholder="Promo Text" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={newProduct.promo || ''} onChange={e => setNewProduct({...newProduct, promo: e.target.value})} />
                <label><input type="checkbox" checked={newProduct.is_bestseller || false} onChange={e => setNewProduct({...newProduct, is_bestseller: e.target.checked})} /> Mark as Bestseller</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ flex: 1, padding: '0.8rem' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.8rem' }} disabled={isUploading}>Add Product</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #eee', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bulk Upload (CSV)</h2>
        <input type="file" accept=".csv" ref={fileInputRef} />
        <button onClick={handleBulkUpload} className="btn-primary" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>Upload CSV</button>
        {uploadSuccess && <p style={{ color: 'green', marginTop: '1rem' }}>Successfully uploaded {uploadedCount} products!</p>}
        {uploadError && <p style={{ color: 'red', marginTop: '1rem' }}>{uploadError}</p>}
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '1rem', border: '1px solid #eee' }}>
        {isLoading ? <Loader2 className="spin" style={{ margin: '2rem auto', display: 'block' }} /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Image</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.id}>
                  <td style={{ padding: '1rem' }}><img src={prod.img} style={{ width: '40px', height: '40px', objectFit: 'cover' }} /></td>
                  <td style={{ padding: '1rem' }}>{prod.name}</td>
                  <td style={{ padding: '1rem' }}>{formatPrice(prod.price)}</td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => handleDelete(prod.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
