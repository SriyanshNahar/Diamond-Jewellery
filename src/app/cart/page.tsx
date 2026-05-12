"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Golden Star Constellation Necklace", price: 2999, quantity: 1, img: "/necklaces.png", metal: "18K Gold Plated" },
    { id: 2, name: "Silver Zircon Drizzle Drop Earrings", price: 3499, quantity: 2, img: "/earrings.png", metal: "925 Pure Silver" },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQ = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQ };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.03; // 3% GST on jewellery
  const total = subtotal + tax;

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Shopping Bag</h1>
        
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-white)', borderRadius: '8px' }}>
            <h2 style={{ color: 'var(--color-gray)', marginBottom: '1rem' }}>Your bag is empty</h2>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', textDecoration: 'none' }}>Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', background: 'var(--color-white)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)' }}>
                  <div style={{ position: 'relative', width: '100px', height: '100px', background: 'var(--color-beige)', borderRadius: '4px', overflow: 'hidden' }}>
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.2rem' }}>{item.name}</h3>
                        <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>{item.metal}</p>
                      </div>
                      <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-black)' }}>₹ {(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', padding: '0.2rem 0.5rem' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-gray)' }}><Minus size={16} /></button>
                        <span style={{ fontWeight: '500', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-gray)' }}><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)', height: 'fit-content' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-black)' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-gray)' }}>
                <span>Subtotal ({items.length} items)</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-gray)' }}>
                <span>Shipping</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--color-gray)', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-gray-light)' }}>
                <span>Estimated Tax (3% GST)</span>
                <span>₹ {tax.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-black)' }}>
                <span>Total</span>
                <span>₹ {total.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
