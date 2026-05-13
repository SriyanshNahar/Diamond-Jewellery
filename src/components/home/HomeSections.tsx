"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import styles from './HomeSections.module.css';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  old_price?: number;
  rating: number;
  reviews: number;
  promo: string;
  stock_count: number;
}

const bonds = [
  { name: "Wife", img: "/rings.png" },
  { name: "Husband", img: "/watches.png" },
  { name: "Mother", img: "/necklaces.png" },
  { name: "Sister", img: "/earrings.png" },
];

export const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  
  useEffect(() => {
    const fetchBestsellers = async () => {
      const { data } = await supabase.from('products').select('*').eq('is_bestseller', true);
      if (data) setProducts(data);
    };
    fetchBestsellers();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <div style={{ background: 'var(--color-beige)', padding: '1rem', textAlign: 'center', marginBottom: '2rem', borderRadius: '4px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-gold-dark)', letterSpacing: '2px' }}>BESTSELLERS</h2>
      </div>
      <div className={styles.productGrid}>
        {products.map(item => (
          <div key={item.id} className={styles.productCard}>
            <div className={styles.imageBox}>
              <div className={styles.tag}>Bestseller</div>
              <button 
                onClick={() => toggleWishlist(item.id)}
                className={styles.heartBtn}
              >
                <Heart size={20} fill={isInWishlist(item.id) ? "var(--color-gold-dark)" : "none"} color="var(--color-gold-dark)" />
              </button>
              <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div className={styles.ratingBadge}>
                {item.rating} <Star size={12} fill="var(--color-gold-dark)" color="var(--color-gold-dark)" /> | {item.reviews}
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrice(item.price)}</span>
                {item.old_price && <span className={styles.oldPrice}>{formatPrice(item.old_price)}</span>}
              </div>
              <h3 className={styles.productName}>{item.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <p className={styles.promoText} style={{ margin: 0 }}>{item.promo}</p>
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: '600',
                  background: (item.stock_count || 0) <= 0 ? '#fee2e2' : (item.stock_count || 0) < 5 ? '#fef3c7' : '#dcfce7',
                  color: (item.stock_count || 0) <= 0 ? '#991b1b' : (item.stock_count || 0) < 5 ? '#92400e' : '#166534'
                }}>
                  {(item.stock_count || 0) <= 0 ? 'Out of Stock' : (item.stock_count || 0) < 5 ? 'Low Stock' : 'In Stock'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => addToCart(item)} 
                  className={styles.addToCartBtn} 
                  style={{ flex: 1, opacity: (item.stock_count || 0) <= 0 ? 0.5 : 1 }}
                  disabled={(item.stock_count || 0) <= 0}
                >
                  {(item.stock_count || 0) <= 0 ? 'Sold Out' : 'Add to Bag'}
                </button>
                <Link href={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                  <button className={styles.addToCartBtn} style={{ background: 'white', color: 'var(--color-black)', border: '1px solid #ddd' }}>View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const PromoBanners = () => {
  return (
    <section className="container" style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* First Access Banner */}
      <div style={{ background: '#7e1828', color: 'white', padding: '4rem', borderRadius: '8px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Image src="/necklaces.png" alt="First Access Banner" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay' }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>FIRST ACCESS <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>to what's new!</span></h2>
          <p>New design destined to become bestsellers</p>
        </div>
      </div>

      <div className="grid-2-col-responsive" style={{ gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Most Gifted Banner */}
          <div style={{ background: '#a04856', padding: '2rem', borderRadius: '8px', color: 'white', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Image src="/rings.png" alt="Most Gifted" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', opacity: 0.3, mixBlendMode: 'overlay' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontStyle: 'italic', fontSize: '2rem', marginBottom: '1rem' }}>Most<br/>GIFTED</h3>
              <Link href="/category/rings" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'white', color: '#a04856', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Explore now</button>
              </Link>
            </div>
          </div>
          
          {/* Precious Fragrances Banner */}
          <div style={{ background: '#e5b5b9', padding: '2rem', borderRadius: '8px', color: '#7e1828', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Image src="/bangles.png" alt="Precious Fragrances" fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontStyle: 'italic', fontSize: '1.8rem', marginBottom: '1rem' }}>Precious<br/>Fragrances</h3>
              <Link href="/category/necklaces" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'white', color: '#7e1828', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Explore now</button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bestsellers Side Banner */}
        <div style={{ background: '#f5f5f5', padding: '3rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
          <Image src="/earrings.png" alt="Bestsellers" fill sizes="(max-width: 768px) 100vw, 66vw" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', margin: '-3rem', padding: '3rem', paddingTop: '10rem', color: 'white' }}>
            <h3 style={{ fontStyle: 'italic', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Bestsellers</h3>
            <p style={{ marginBottom: '1rem', opacity: 0.9 }}>most loved pure diamond picks</p>
            <Link href="/category/earrings" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'white', color: 'var(--color-black)', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Shop now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ShopByBond = () => {
  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', color: 'var(--color-black)' }}>Shop by Bond</h2>
      <div className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {bonds.map((bond, idx) => (
          <Link href="/category/other" key={idx} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--color-gray-light)', borderRadius: '8px', overflow: 'hidden', position: 'relative', aspectRatio: '4/5' }}>
              <Image src={bond.img} alt={bond.name} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.9)', padding: '0.8rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--color-black)' }}>
                {bond.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const AboutLegacy = () => {
  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <div className="grid-2-col-responsive" style={{ background: '#f9f9f9', border: '1px solid var(--color-gray-light)' }}>
        <div style={{ padding: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', borderTop: '2px solid var(--color-black)', width: 'fit-content', paddingTop: '1rem' }}>ABOUT US</h2>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            We are one of the oldest business families in India with a family legacy of over 100 years in business. Started for the noble cause of nation-building, the forefathers believed ethical, honest and transparent business practices should form the foundation of the group.
          </p>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '2rem' }}>
            Having ventured into luxury jewellery retailing, we have expanded globally, setting the standard for purity and unparalleled craftsmanship.
          </p>
          <Link href="/about" style={{ textDecoration: 'none' }}>
            <button style={{ background: 'transparent', border: '1px solid var(--color-black)', padding: '0.8rem 2rem', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-black)' }}>VIEW MORE</button>
          </Link>
        </div>
        <div style={{ background: '#d32f2f', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>OVER</p>
          <h2 style={{ fontSize: '6rem', fontFamily: 'var(--font-heading)', lineHeight: '1' }}>100</h2>
          <p style={{ fontSize: '1rem', letterSpacing: '2px' }}>YEARS IN TRADE</p>
        </div>
      </div>
    </section>
  );
};

export const CustomerFeedback = () => {
  const [fData, setFData] = useState<any>({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validate message to filter bad words
  const prohibitedWords = ['abuse', 'badword', 'spam', 'hate', 'stupid', 'idiot'];
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (fData.name.length < 2) return setError('Name must be at least 2 characters');
    const hasBadWord = prohibitedWords.some(word => fData.comment.toLowerCase().includes(word));
    if (hasBadWord) return setError('Please maintain respectful language in your feedback.');

    setSubmitting(true);
    const { error } = await (supabase.from('feedbacks') as any).insert([{
      customer_name: fData.name,
      rating: fData.rating,
      comment: fData.comment
    }]);

    if (!error) {
      setSubmitted(true);
      setFData({ name: '', rating: 5, comment: '' });
    } else {
      setError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-white)', borderTop: '1px solid #eee' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Share Your Experience</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>Your feedback helps us maintain our 100-year legacy of excellence.</p>
        
        {submitted ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            style={{ textAlign: 'center', padding: '3rem', background: '#fdfcfb', borderRadius: '16px', border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden' }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, x: 0, opacity: 1 }}
                animate={{ 
                  y: -200 - Math.random() * 100, 
                  x: (Math.random() - 0.5) * 300,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '50%',
                  width: '10px',
                  height: '10px',
                  background: ['#D4AF37', '#ef4444', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0'
                }}
              />
            ))}
            <h3 style={{ fontSize: '2rem', color: 'var(--color-gold-dark)', marginBottom: '1rem' }}>Thank You! ✨</h3>
            <p style={{ color: '#666' }}>Your review has been submitted successfully.</p>
            <button onClick={() => setSubmitted(false)} style={{ marginTop: '2rem', padding: '0.8rem 2rem', background: 'none', border: '1px solid var(--color-gold-dark)', color: 'var(--color-gold-dark)', borderRadius: '4px', cursor: 'pointer' }}>Submit Another</button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fdfcfb', padding: '2.5rem', borderRadius: '16px', border: '1px solid #f0f0f0' }}>
            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
              <input required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} value={fData.name} onChange={e => setFData({...fData, name: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map(num => (
                  <button type="button" key={num} onClick={() => setFData({...fData, rating: num})} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Star size={24} fill={num <= fData.rating ? "var(--color-gold-dark)" : "none"} color="var(--color-gold-dark)" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message</label>
              <textarea required rows={4} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', resize: 'none' }} value={fData.comment} onChange={e => setFData({...fData, comment: e.target.value})} />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '1rem' }}>
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      const { data } = await (supabase.from('feedbacks') as any)
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
      setLoading(false);
    };
    fetchApproved();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section style={{ padding: '6rem 0', background: '#fdfcfb' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '4rem' }}>Customer Whispers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {reviews.map(rev => (
            <div key={rev.id} style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < rev.rating ? "#D4AF37" : "none"} color={i < rev.rating ? "#D4AF37" : "#ddd"} />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: '#444', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem' }}>"{rev.comment}"</p>
              <div style={{ fontWeight: '600', color: 'var(--color-black)', letterSpacing: '1px' }}>- {rev.customer_name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
