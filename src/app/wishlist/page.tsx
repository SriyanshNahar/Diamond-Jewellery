"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Vintage Rose Cut Earrings", price: 1170000, img: "/earrings.png", category: "Earrings" },
    { id: 2, name: "Eternity Diamond Band", price: 45000, img: "/rings.png", category: "Rings" },
    { id: 3, name: "Diamond Tennis Bracelet", price: 9120000, img: "/watches.png", category: "Bracelets" },
  ]);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>My Favourites</h1>
        
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-white)', borderRadius: '8px' }}>
            <h2 style={{ color: 'var(--color-gray)', marginBottom: '1rem' }}>Your wishlist is empty</h2>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', textDecoration: 'none' }}>Discover Jewellery</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden', position: 'relative' }}>
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gray)' }}
                >
                  <Trash2 size={18} />
                </button>
                
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                  <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{item.category}</p>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-gold-dark)', marginBottom: '1.5rem' }}>₹ {item.price.toLocaleString('en-IN')}</p>
                  
                  <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.8rem', background: '#fbcfe8', color: '#831843', border: 'none' }}>
                    <ShoppingBag size={18} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
