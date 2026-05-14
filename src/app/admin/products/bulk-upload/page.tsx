"use client";

import React, { useState, useRef } from 'react';
import { Upload, CloudUpload, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Papa from 'papaparse';
import JSZip from 'jszip';

export default function BulkUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [imageMapState, setImageMapState] = useState<Map<string, string>>(new Map());
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const csvInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('id, name');
    if (data) setCategories(data);
  };

  const handleImport = async () => {
    const csvFile = csvInputRef.current?.files?.[0];
    const zipFile = zipInputRef.current?.files?.[0];

    if (!csvFile) {
      setUploadError('Please select a CSV file.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError(null);

    try {
      // Step 1: Process ZIP if available
      const imageMap = new Map<string, string>(); // filename -> public URL
      if (zipFile) {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(zipFile);
        
        const uploadPromises: Promise<void>[] = [];
        zipContent.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            // Ignore hidden files like .DS_Store
            if (relativePath.includes('.DS_Store') || relativePath.startsWith('__MACOSX')) return;

            uploadPromises.push(
              zipEntry.async('blob').then(async (blob) => {
                const fileName = `bulk_${Date.now()}_${relativePath.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                const { error } = await supabase.storage.from('product-images').upload(fileName, blob);
                
                if (!error) {
                  const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
                  imageMap.set(relativePath, publicUrl);
                }
              })
            );
          }
        });

        await Promise.all(uploadPromises);
      }

      // Step 2: Parse CSV and validate
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const errors: string[] = [];
            const formattedData = results.data.map((row: any, index: number) => {
              const resolveImage = (imgName: string | undefined) => {
                if (!imgName) return null;
                if (imgName.startsWith('http') || imgName.startsWith('/')) return imgName;
                return imageMap.get(imgName) || imgName;
              };

              const catId = row.category_id ? parseInt(row.category_id) : null;
              const category = catId ? categories.find(c => c.id === catId) : null;
              
              if (catId && !category) {
                errors.push(`Row ${index + 1}: Invalid category ID ${catId} for product "${row.name}"`);
              }

              return {
                name: String(row.name || ''),
                price: parseFloat(row.price) || 0,
                old_price: row.old_price ? parseFloat(row.old_price) : null,
                rating: row.rating ? parseFloat(row.rating) : 0,
                reviews: row.reviews ? parseInt(row.reviews) : 0,
                promo: row.promo ? String(row.promo) : null,
                img: resolveImage(row.thumbnail_file) || '/rings.png',
                is_bestseller: row.is_bestseller === '1' || row.is_bestseller === 'true' || row.is_bestseller === true,
                stock_count: row.stock_count ? parseInt(row.stock_count) : 10,
                category_id: catId,
                _category_name: category ? category.name : 'Uncategorized' // For preview
              };
            });

            setValidationErrors(errors);
            setPreviewData(formattedData);
            setImageMapState(imageMap);
            setShowPreview(true);

          } catch (err: any) {
            setUploadError('Error formatting data: ' + err.message);
          }
          setIsUploading(false);
        },
        error: (error) => {
          setUploadError('CSV Parse Error: ' + error.message);
          setIsUploading(false);
        }
      });
    } catch (err: any) {
      setUploadError(err.message);
      setIsUploading(false);
    }
  };

  const handleConfirmUpload = async () => {
    if (validationErrors.length > 0) {
      setUploadError('Please fix validation errors before uploading.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const dataToInsert = previewData.map(({ _category_name, ...rest }) => rest);
      const { data, error } = await (supabase.from('products') as any)
        .insert(dataToInsert)
        .select();

      if (error) {
        setUploadError(error.message);
      } else {
        setUploadedCount(data.length);
        setUploadSuccess(true);
        setShowPreview(false);
        setPreviewData([]);
        if (csvInputRef.current) csvInputRef.current.value = '';
        if (zipInputRef.current) zipInputRef.current.value = '';
      }
    } catch (err: any) {
      setUploadError('Error uploading data: ' + err.message);
    }
    setIsUploading(false);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '80vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <Link href="/admin/products" style={{ color: 'var(--color-black)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>
          <CloudUpload style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Bulk Upload Products
        </h1>
      </div>
      <p style={{ color: '#666', marginBottom: '2rem', marginLeft: '3rem' }}>
        Upload many products at once using a CSV file and an optional ZIP of images.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left Card: Upload Form */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Upload CSV & Images</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>CSV File <span style={{ color: 'red' }}>*</span></label>
            <input type="file" accept=".csv" ref={csvInputRef} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Images ZIP (optional but recommended)</label>
            <input type="file" accept=".zip" ref={zipInputRef} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} />
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Put all product images inside one ZIP. File names must match the names used in the CSV columns <code style={{ color: '#e11d48' }}>thumbnail_file</code>.
            </p>
          </div>

          {uploadError && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '0.9rem' }}>{uploadError}</span>
            </div>
          )}

          {uploadSuccess && (
            <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} />
              <span style={{ fontSize: '0.9rem' }}>Successfully imported {uploadedCount} products!</span>
            </div>
          )}

          <button 
            onClick={handleImport} 
            disabled={isUploading || showPreview}
            style={{ width: '100%', padding: '1rem', background: '#111', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: (isUploading || showPreview) ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            {isUploading ? <><Loader2 className="spin" size={20} /> Processing...</> : <><CloudUpload size={20} /> Preview Import</>}
          </button>
        </div>

        {/* Right Card: Format Instructions */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>CSV Format</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#444' }}>Columns (header row required):</p>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #e5e7eb' }}>
              name,price,old_price,rating,reviews,promo,thumbnail_file,is_bestseller,stock_count,category_id
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#444' }}>Example row:</p>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #e5e7eb' }}>
              "Diamond Pendant",2999,5000,4.8,120,"New Arrival","pendant.jpg",1,50,2
            </div>
          </div>

          <ul style={{ fontSize: '0.85rem', color: '#555', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><code style={{ color: '#e11d48' }}>name</code> - Product title (required).</li>
            <li><code style={{ color: '#e11d48' }}>price</code> - Current selling price (number).</li>
            <li><code style={{ color: '#e11d48' }}>is_bestseller</code> - <code style={{ color: '#e11d48' }}>1</code> = YES, <code style={{ color: '#e11d48' }}>0</code> = NO.</li>
            <li><code style={{ color: '#e11d48' }}>thumbnail_file</code> - Exact name of the image inside the ZIP (e.g. <code style={{ color: '#e11d48' }}>image1.jpg</code>).</li>
            <li><code style={{ color: '#e11d48' }}>stock_count</code> - Number of items in stock (e.g. 10).</li>
            <li><code style={{ color: '#e11d48' }}>category_id</code> - The numeric ID of the category (optional).</li>
          </ul>

        </div>

      </div>

      {showPreview && (
        <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Preview Upload Data</h2>
          
          {validationErrors.length > 0 && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={18} /> Validation Errors</h3>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Please fix these errors in your CSV and try again.</p>
            </div>
          )}

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Image</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center' }}>Bestseller</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 50).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.75rem' }}><img src={row.img} alt={row.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '0.75rem' }}>{row.name}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {row.category_id ? (
                        <span style={{ background: row._category_name === 'Uncategorized' ? '#fee2e2' : '#dcfce7', color: row._category_name === 'Uncategorized' ? '#991b1b' : '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {row._category_name} (ID: {row.category_id})
                        </span>
                      ) : (
                        <span style={{ color: '#666' }}>None</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem' }}>₹{row.price}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{row.is_bestseller ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 50 && <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>Showing 50 of {previewData.length} items</p>}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              onClick={() => setShowPreview(false)}
              style={{ padding: '0.8rem 1.5rem', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmUpload}
              disabled={isUploading || validationErrors.length > 0}
              style={{ padding: '0.8rem 1.5rem', background: '#111', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: (isUploading || validationErrors.length > 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: validationErrors.length > 0 ? 0.5 : 1 }}
            >
              {isUploading ? <><Loader2 className="spin" size={18} /> Uploading...</> : <><CheckCircle2 size={18} /> Confirm & Upload {previewData.length} Products</>}
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
