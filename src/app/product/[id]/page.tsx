"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, PlayCircle, Heart, ShoppingBag } from 'lucide-react';
import { use } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState<any>(null);
  const [zoom, setZoom] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
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
      }
      setLoading(false);
    };
    fetchProduct();
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

  return (
    <div className={styles.container}>
      <div className="container">
        
        <div className={styles.productGrid}>
          {/* Images & Video Section */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnails}>
              {product.media.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${activeMedia.url === item.url ? styles.activeThumb : ''}`}
                  onClick={() => { setActiveMedia(item); setZoom(false); }}
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
              onClick={() => { if(activeMedia.type === 'image') setZoom(!zoom) }}
              style={{ cursor: activeMedia.type === 'image' ? (zoom ? 'zoom-out' : 'zoom-in') : 'default' }}
            >
              {activeMedia.type === 'image' ? (
                <Image 
                  src={activeMedia.url} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-gray-light)', paddingTop: '4rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>You May Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Recommendation 1 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/rings.png" alt="Princess Cut Ring" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Princess Cut Halo Ring</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 85,000</p>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/watches.png" alt="Diamond Watch" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Oyster Perpetual Diamond</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 5,20,000</p>
              </div>
            </div>

            {/* Recommendation 3 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/earrings.png" alt="Diamond Earrings" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Vintage Drop Earrings</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 1,15,000</p>
              </div>
            </div>

            {/* Recommendation 4 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/necklaces.png" alt="Diamond Necklace" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Solitaire Pendant</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 65,000</p>
              </div>
            </div>
          </div>
        </div>

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
