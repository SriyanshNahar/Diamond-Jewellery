"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const handleApplyPromo = async () => {
    setPromoError('');
    const { data, error } = await (supabase.from('promo_codes') as any)
      .select('*')
      .eq('code', promoCode.toUpperCase())
      .eq('active', true)
      .single();

    if (data) {
      setDiscount(data.discount_percent);
      alert(`Promo code applied! ${data.discount_percent}% discount added.`);
    } else {
      setPromoError('Invalid or expired promo code');
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.03; // 3% GST on jewellery
  const total = subtotal - discountAmount + tax;

  const handleCheckout = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    setIsCheckingOut(true);

    const generatedTrackingId = 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const { error } = await (supabase.from('orders') as any).insert([{
      customer_name: user.email?.split('@')[0] || 'Customer',
      customer_email: user.email,
      total_amount: total,
      status: 'pending',
      tracking_id: generatedTrackingId
    }]);

    if (!error) {
      setTrackingId(generatedTrackingId);
      setCheckoutSuccess(true);
      clearCart();
    } else {
      alert('Checkout failed: ' + error.message);
    }
    setIsCheckingOut(false);
  };

  if (checkoutSuccess) {
    return (
      <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Order Placed!</h2>
          <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>Thank you for shopping with Aura. Your luxury pieces are being prepared for secure shipping.</p>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Your Tracking ID</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-gold-dark)', letterSpacing: '2px' }}>{trackingId}</p>
          </div>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', textDecoration: 'none' }}>Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Shopping Bag</h1>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-white)', borderRadius: '8px' }}>
            <h2 style={{ color: 'var(--color-gray)', marginBottom: '1rem' }}>Your bag is empty</h2>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', textDecoration: 'none' }}>Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid-2-col-responsive" style={{ gap: '2rem' }}>
            
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', background: 'var(--color-white)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)' }}>
                  <div style={{ position: 'relative', width: '100px', height: '100px', background: 'var(--color-beige)', borderRadius: '4px', overflow: 'hidden' }}>
                    <Image src={item.img} alt={item.name} fill sizes="100px" style={{ objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.2rem' }}>{item.name}</h3>
                      </div>
                      <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-black)' }}>₹ {(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', padding: '0.2rem 0.5rem' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-gray)' }}><Minus size={16} /></button>
                        <span style={{ fontWeight: '500', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-gray)' }}><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Have a Promo Code?</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter code (e.g. AURA10)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{ flex: 1, padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' }} 
                  />
                  <button onClick={handleApplyPromo} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Apply</button>
                </div>
                {promoError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{promoError}</p>}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)', height: 'fit-content' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-black)' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--color-gray)' }}>
                <span>Subtotal ({cart.length} items)</span>
                <span>₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#10b981' }}>
                  <span>Promo Discount ({discount}%)</span>
                  <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
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
              
              <button onClick={handleCheckout} disabled={isCheckingOut} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                {isCheckingOut ? 'Processing...' : <><>Proceed to Checkout</> <ArrowRight size={20} /></>}
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
