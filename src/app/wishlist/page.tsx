"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
    }
  }, [wishlist]);

  const fetchWishlistProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', wishlist);
    
    if (data) setProducts(data);
    setLoading(false);
  };

  const moveToCart = (product: any) => {
    addToCart(product);
    toggleWishlist(product.id);
  };

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>My Favourites</h1>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}><Loader2 size={32} className="spin" style={{ margin: '0 auto' }} /></div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-white)', borderRadius: '8px' }}>
            <h2 style={{ color: 'var(--color-gray)', marginBottom: '1rem' }}>Your wishlist is empty</h2>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', textDecoration: 'none' }}>Discover Jewellery</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.map(item => (
              <div key={item.id} style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden', position: 'relative' }}>
                <button 
                  onClick={() => toggleWishlist(item.id)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}
                >
                  <Trash2 size={18} />
                </button>
                
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                  <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-gold-dark)', marginBottom: '1.5rem' }}>₹ {item.price.toLocaleString('en-IN')}</p>
                  
                  <button 
                    onClick={() => moveToCart(item)}
                    className="btn-primary" 
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem', background: '#fbcfe8', color: '#831843', border: 'none' }}
                  >
                    <ShoppingBag size={18} /> Move to Cart
                  </button>
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
