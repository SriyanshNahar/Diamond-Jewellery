"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, PlayCircle } from 'lucide-react';
import { use } from 'react';
import styles from './page.module.css';

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  // Hardcoded for mockup, ideally fetched from DB using params.id
  const product = {
    id: params.id,
    name: "Eternity Diamond Band",
    price: "₹ 45,000",
    description: "An exquisite eternity band featuring perfectly matched, ethically sourced natural diamonds set in 18K solid gold. Designed to be worn alone or stacked for an elevated look.",
    metal: "18K Yellow Gold",
    diamondWeight: "0.50 Carats",
    clarity: "VS-GH",
    media: [
      { type: 'image', url: "/rings.png" },
      { type: 'image', url: "/earrings.png" },
      { type: 'image', url: "/necklaces.png" },
      { type: 'image', url: "/watches.png" },
      { type: 'image', url: "/rings.png" },
      { type: 'image', url: "/earrings.png" },
      { type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4" } // Example video
    ]
  };

  const [activeMedia, setActiveMedia] = useState(product.media[0]);
  const [zoom, setZoom] = useState(false);

  return (
    <div className={styles.container}>
      <div className="container">
        
        <div className={styles.productGrid}>
          {/* Images & Video Section */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnails}>
              {product.media.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${activeMedia.url === item.url ? styles.activeThumb : ''}`}
                  onClick={() => { setActiveMedia(item); setZoom(false); }}
                >
                  {item.type === 'image' ? (
                    <Image src={item.url} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
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
              <span className={styles.reviewCount}>(24 Reviews)</span>
            </div>

            <p className={styles.price}>{product.price}</p>
            <p className={styles.taxInfo}>Inclusive of all taxes</p>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            <div className={styles.detailsBox}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Metal</span>
                <span className={styles.detailValue}>{product.metal}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Diamond Weight</span>
                <span className={styles.detailValue}>{product.diamondWeight}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Clarity & Color</span>
                <span className={styles.detailValue}>{product.clarity}</span>
              </div>
            </div>

            <button className={`btn-primary ${styles.addToCartBtn}`}>
              Add to Cart
            </button>

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
                <Image src="/rings.png" alt="Princess Cut Ring" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Princess Cut Halo Ring</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 85,000</p>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/watches.png" alt="Diamond Watch" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Oyster Perpetual Diamond</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 5,20,000</p>
              </div>
            </div>

            {/* Recommendation 3 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/earrings.png" alt="Diamond Earrings" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-black)', marginBottom: '0.5rem' }}>Vintage Drop Earrings</h3>
                <p style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>₹ 1,15,000</p>
              </div>
            </div>

            {/* Recommendation 4 */}
            <div style={{ background: 'var(--color-white)', borderRadius: '8px', border: '1px solid var(--color-gray-light)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--color-beige)' }}>
                <Image src="/necklaces.png" alt="Diamond Necklace" fill style={{ objectFit: 'cover' }} />
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
