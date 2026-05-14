"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileDown, Plus, Edit, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Papa from 'papaparse';
import Link from 'next/link';

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

  const handleToggleBestseller = async (id: number, currentStatus: boolean) => {
    const { error } = await (supabase.from('products') as any)
      .update({ is_bestseller: !currentStatus })
      .eq('id', id);

    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, is_bestseller: !currentStatus } : p));
    } else {
      alert('Error updating bestseller status');
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
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
    stock_count: 10
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    const newImages = [...(isEditing ? editingProduct.images || [editingProduct.img] : newProduct.images)];

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
    
    if (isEditing) {
      setEditingProduct({ ...editingProduct, images: newImages });
    } else {
      setNewProduct({ ...newProduct, images: newImages });
    }
    setUploadingFile(false);
  };

  const removeImage = (index: number, isEditing: boolean = false) => {
    if (isEditing) {
      setEditingProduct({
        ...editingProduct,
        images: editingProduct.images.filter((_: any, i: number) => i !== index)
      });
    } else {
      setNewProduct({
        ...newProduct,
        images: newProduct.images.filter((_: any, i: number) => i !== index)
      });
    }
  };

  const openEditModal = (prod: any) => {
    setEditingProduct({
      ...prod,
      images: prod.images || [prod.img]
    });
    setIsEditModalOpen(true);
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.images || editingProduct.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    setIsUploading(true);
    
    const productToUpdate = {
      name: editingProduct.name,
      price: editingProduct.price,
      images: editingProduct.images,
      img: editingProduct.images[0],
      category_id: editingProduct.category_id,
      promo: editingProduct.promo,
      is_bestseller: editingProduct.is_bestseller,
      stock_count: editingProduct.stock_count,
    };

    const { data, error } = await (supabase.from('products') as any)
      .update(productToUpdate)
      .eq('id', editingProduct.id)
      .select();

    if (!error) {
      setProducts(products.map(p => p.id === editingProduct.id ? data[0] : p));
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } else {
      alert('Error updating product: ' + error.message);
    }
    setIsUploading(false);
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
        name: '', price: 0, images: [], is_bestseller: false, promo: '', rating: 4.5, reviews: 120, category_id: null, stock_count: 10
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
          stock_count: row.stock_count ? parseInt(row.stock_count) : 10
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Product Management</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
          <Link href="/admin/products/bulk-upload" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f5f5f5', border: '1px solid #ddd', color: '#333', borderRadius: '4px', textDecoration: 'none' }}>
            <FileDown size={18} /> Bulk Upload
          </Link>
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
                    onChange={(e) => handleFileChange(e, false)} 
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
                          onClick={() => removeImage(index, false)}
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

        {isEditModalOpen && editingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Edit Product</h2>
              <form onSubmit={handleEditProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input required placeholder="Product Name" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                <input type="number" required placeholder="Price (₹)" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                <select style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={editingProduct.category_id || ''} onChange={e => setEditingProduct({...editingProduct, category_id: parseInt(e.target.value) || null})}>
                  <option value="">Select Collection</option>
                  {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                </select>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#666' }}>Product Images (Up to 5)</label>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, true)} 
                    disabled={uploadingFile || (editingProduct.images && editingProduct.images.length >= 5)}
                    style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} 
                  />
                  {uploadingFile && <p style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)' }}>Uploading images...</p>}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {editingProduct.images && editingProduct.images.map((url: string, index: number) => (
                      <div key={index} style={{ position: 'relative', width: '60px', height: '60px', border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                        <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button" 
                          onClick={() => removeImage(index, true)}
                          style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <input placeholder="Promo Text" style={{ padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} value={editingProduct.promo || ''} onChange={e => setEditingProduct({...editingProduct, promo: e.target.value})} />
                <label><input type="checkbox" checked={editingProduct.is_bestseller || false} onChange={e => setEditingProduct({...editingProduct, is_bestseller: e.target.checked})} /> Mark as Bestseller</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ flex: 1, padding: '0.8rem' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.8rem' }} disabled={isUploading}>Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      <div style={{ background: 'white', borderRadius: '8px', padding: '1rem', border: '1px solid #eee', overflowX: 'auto' }}>
        {isLoading ? <Loader2 className="spin" style={{ margin: '2rem auto', display: 'block' }} /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Image</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Price</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}>Bestseller</th>
                <th style={{ textAlign: 'left', padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.id}>
                  <td style={{ padding: '1rem' }}><img src={prod.img} style={{ width: '40px', height: '40px', objectFit: 'cover' }} /></td>
                  <td style={{ padding: '1rem' }}>{prod.name}</td>
                  <td style={{ padding: '1rem' }}>{formatPrice(prod.price)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="checkbox" 
                          checked={prod.is_bestseller} 
                          onChange={() => handleToggleBestseller(prod.id, prod.is_bestseller)}
                          style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }} 
                        />
                        <div style={{ width: '36px', height: '20px', backgroundColor: prod.is_bestseller ? '#16a34a' : '#d1d5db', borderRadius: '20px', transition: 'background-color 0.2s', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '2px', left: prod.is_bestseller ? '18px' : '2px', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                        </div>
                      </div>
                    </label>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEditModal(prod)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}><Edit size={16} /></button>
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
