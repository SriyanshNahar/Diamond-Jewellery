"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, PlayCircle, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [product, setProduct] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchProductAndRecs = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (data) {
        // Build media array from images array or legacy img field
        const imagesArray = (data as any).images && (data as any).images.length > 0 ? (data as any).images : [(data as any).img];
        const media = imagesArray.map((url: string) => ({ type: 'image', url }));
        
        setProduct({ ...(data as any), media });
        setActiveMedia(media[0]);
        setActiveIndex(0);

        // Fetch Recommendations
        let recQuery = supabase.from('products').select('*').neq('id', params.id).limit(4);
        if ((data as any).category_id) {
            recQuery = recQuery.eq('category_id', (data as any).category_id);
        }
        const { data: recData } = await recQuery;
        if (recData && recData.length > 0) {
            setRecommendations(recData);
        } else {
            // fallback if no products in same category
            const { data: allData } = await supabase.from('products').select('*').neq('id', params.id).limit(4);
            if (allData) setRecommendations(allData);
        }
      }
      setLoading(false);
    };
    fetchProductAndRecs();
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) return <div style={{ padding: '10rem', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '10rem', textAlign: 'center' }}>Product not found</div>;

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % product.media.length;
    setActiveIndex(nextIndex);
    setActiveMedia(product.media[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + product.media.length) % product.media.length;
    setActiveIndex(prevIndex);
    setActiveMedia(product.media[prevIndex]);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    setTouchStart(null);
  };

  return (
    <div className={styles.container}>
      {lightboxOpen && activeMedia.type === 'image' && (
        <div className={styles.lightbox} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxClose}>✕</div>
          <img src={activeMedia.url} alt={product.name} className={styles.lightboxImage} />
        </div>
      )}
      <div className="container">
        
        <div className={styles.productGrid}>
          {/* Images & Video Section */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnails}>
              {product.media.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${activeMedia.url === item.url ? styles.activeThumb : ''}`}
                  onClick={() => { setActiveMedia(item); setActiveIndex(idx); setZoom(false); }}
                >
                  {item.type === 'image' ? (
                    <Image src={item.url} alt="Thumbnail" fill sizes="80px" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f5f5dc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <PlayCircle size={24} color="var(--color-gold-dark)" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div 
              className={`${styles.mainImageContainer} ${zoom && activeMedia.type === 'image' ? styles.zoomed : ''}`}
              onClick={() => { if(activeMedia.type === 'image') setLightboxOpen(true) }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ cursor: activeMedia.type === 'image' ? 'zoom-in' : 'default' }}
            >
              {activeMedia.type === 'image' ? (
                <img 
                  src={activeMedia.url} 
                  alt={product.name} 
                  className={styles.mainImage} 
                />
              ) : (
                <video 
                  src={activeMedia.url} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} 
                />
              )}
              {product.media.length > 1 && (
                <>
                  <button className={`${styles.navButton} ${styles.prevButton}`} onClick={(e) => { e.stopPropagation(); handlePrev(); }}>‹</button>
                  <button className={`${styles.navButton} ${styles.nextButton}`} onClick={(e) => { e.stopPropagation(); handleNext(); }}>›</button>
                  <div className={styles.dots}>
                    {product.media.map((_: any, idx: number) => (
                      <div key={idx} className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            <div className={styles.reviewsRow}>
              <div className={styles.stars}>
                <Star size={16} fill="#D4AF37" color="#D4AF37" />
                <Star size={16} fill="#D4AF37" color="#D4AF37" />
                <Star size={16} fill="#D4AF37" color="#D4AF37" />
                <Star size={16} fill="#D4AF37" color="#D4AF37" />
                <Star size={16} fill="#D4AF37" color="#D4AF37" />
              </div>
              <h1 className={styles.productName}>{product.name}</h1>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
              {product.old_price && <span className={styles.originalPrice}>{formatPrice(product.old_price)}</span>}
            </div>
            
            <p className={styles.description}>
              {product.description || "An exquisite piece featuring perfectly matched, ethically sourced natural diamonds set in solid gold. Designed for an elevated look."}
            </p>

            <div className={styles.actions}>
              <button 
                onClick={() => addToCart(product)}
                className="btn-primary" 
                style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <ShoppingBag size={20} /> ADD TO BAG
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={styles.wishlistBtn}
                style={{ 
                  padding: '1rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "#ef4444" : "none"} color={isInWishlist(product.id) ? "#ef4444" : "#666"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <ShieldCheck size={24} />
                <span>Lifetime Exchange</span>
              </div>
              <div className={styles.badge}>
                <Truck size={24} />
                <span>Free Secure Shipping</span>
              </div>
              <div className={styles.badge}>
                <RotateCcw size={24} />
                <span>14-Day Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Product Recommendations */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-gray-light)', paddingTop: '4rem' }}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
              {recommendations.map((rec: any) => (
                <Link href={`/product/${rec.id}`} key={rec.id} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden', height: '100%' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                      <Image src={rec.img || '/rings.png'} alt={rec.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>{rec.name}</h3>
                      <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>{formatPrice(rec.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section Placeholder */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Customer Reviews</h2>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              <Star size={14} fill="#D4AF37" color="#D4AF37" />
              <Star size={14} fill="#D4AF37" color="#D4AF37" />
              <Star size={14} fill="#D4AF37" color="#D4AF37" />
              <Star size={14} fill="#D4AF37" color="#D4AF37" />
              <Star size={14} fill="#D4AF37" color="#D4AF37" />
            </div>
            <h4>Absolutely Stunning</h4>
            <p className={styles.reviewText}>"The craftsmanship is unparalleled. It looks even better in person. I will definitely be purchasing from Aura again."</p>
            <p className={styles.reviewer}>- Priya S.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
