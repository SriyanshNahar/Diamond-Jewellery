"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import styles from './page.module.css';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Hardcoded for mockup, ideally fetched from DB using params.id
  const product = {
    id: params.id,
    name: "Eternity Diamond Band",
    price: "₹ 45,000",
    description: "An exquisite eternity band featuring perfectly matched, ethically sourced natural diamonds set in 18K solid gold. Designed to be worn alone or stacked for an elevated look.",
    metal: "18K Yellow Gold",
    diamondWeight: "0.50 Carats",
    clarity: "VS-GH",
    images: ["/rings.png", "/earrings.png"]
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [zoom, setZoom] = useState(false);

  return (
    <div className={styles.container}>
      <div className="container">
        
        <div className={styles.productGrid}>
          {/* Images Section */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${mainImage === img ? styles.activeThumb : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <Image src={img} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            
            <div 
              className={`${styles.mainImageContainer} ${zoom ? styles.zoomed : ''}`}
              onClick={() => setZoom(!zoom)}
              style={{ cursor: zoom ? 'zoom-out' : 'zoom-in' }}
            >
              <Image 
                src={mainImage} 
                alt={product.name} 
                fill 
                className={styles.mainImage} 
              />
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
