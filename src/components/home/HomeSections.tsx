import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import styles from './HomeSections.module.css';

const bestsellers = [
  { id: 1, name: "Golden Star Constellation Necklace", price: "₹2,999", oldPrice: "₹5,499", rating: "4.8", reviews: "949", promo: "PRICE DROP!", img: "/necklaces.png" },
  { id: 2, name: "Silver Deer Heart Necklace", price: "₹3,499", oldPrice: "₹6,199", rating: "4.8", reviews: "710", promo: "PRICE DROP!", img: "/necklaces.png" },
  { id: 3, name: "Silver Zircon Pendant with Link Chain", price: "₹3,299", oldPrice: "₹5,799", rating: "4.8", reviews: "469", promo: "EXTRA 15% OFF", img: "/necklaces.png" },
  { id: 4, name: "Silver Zircon Drizzle Drop Earrings", price: "₹3,499", oldPrice: "₹5,499", rating: "4.8", reviews: "561", promo: "EXTRA 15% OFF", img: "/earrings.png" },
];

const bonds = [
  { name: "Wife", img: "/rings.png" },
  { name: "Husband", img: "/watches.png" },
  { name: "Mother", img: "/necklaces.png" },
  { name: "Sister", img: "/earrings.png" },
];

export const Bestsellers = () => {
  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <div style={{ background: 'var(--color-beige)', padding: '1rem', textAlign: 'center', marginBottom: '2rem', borderRadius: '4px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-gold-dark)', letterSpacing: '2px' }}>BESTSELLERS</h2>
      </div>
      <div className={styles.productGrid}>
        {bestsellers.map(item => (
          <div key={item.id} className={styles.productCard}>
            <div className={styles.imageBox}>
              <div className={styles.tag}>Bestseller</div>
              <button className={styles.heartBtn}><Heart size={20} color="var(--color-gold-dark)" /></button>
              <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
              <div className={styles.ratingBadge}>
                {item.rating} <Star size={12} fill="var(--color-gold-dark)" color="var(--color-gold-dark)" /> | {item.reviews}
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{item.price}</span>
                <span className={styles.oldPrice}>{item.oldPrice}</span>
              </div>
              <h3 className={styles.productName}>{item.name}</h3>
              <p className={styles.promoText}>{item.promo}</p>
              <Link href={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                <button className={styles.addToCartBtn}>Add to Cart</button>
              </Link>
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
        <Image src="/necklaces.png" alt="First Access Banner" fill style={{ objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay' }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>FIRST ACCESS <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>to what's new!</span></h2>
          <p>New design destined to become bestsellers</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Most Gifted Banner */}
          <div style={{ background: '#a04856', padding: '2rem', borderRadius: '8px', color: 'white', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Image src="/rings.png" alt="Most Gifted" fill style={{ objectFit: 'cover', opacity: 0.3, mixBlendMode: 'overlay' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontStyle: 'italic', fontSize: '2rem', marginBottom: '1rem' }}>Most<br/>GIFTED</h3>
              <button style={{ background: 'white', color: '#a04856', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Explore now</button>
            </div>
          </div>
          
          {/* Precious Fragrances Banner */}
          <div style={{ background: '#e5b5b9', padding: '2rem', borderRadius: '8px', color: '#7e1828', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Image src="/bangles.png" alt="Precious Fragrances" fill style={{ objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ fontStyle: 'italic', fontSize: '1.8rem', marginBottom: '1rem' }}>Precious<br/>Fragrances</h3>
              <button style={{ background: 'white', color: '#7e1828', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Explore now</button>
            </div>
          </div>
        </div>
        
        {/* Bestsellers Side Banner */}
        <div style={{ background: '#f5f5f5', padding: '3rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
          <Image src="/earrings.png" alt="Bestsellers" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', margin: '-3rem', padding: '3rem', paddingTop: '10rem', color: 'white' }}>
            <h3 style={{ fontStyle: 'italic', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Bestsellers</h3>
            <p style={{ marginBottom: '1rem', opacity: 0.9 }}>most loved pure diamond picks</p>
            <button style={{ background: 'white', color: 'var(--color-black)', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '20px', width: 'fit-content', fontWeight: 'bold', cursor: 'pointer' }}>Shop now</button>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {bonds.map((bond, idx) => (
          <div key={idx} style={{ background: 'var(--color-gray-light)', borderRadius: '8px', overflow: 'hidden', position: 'relative', aspectRatio: '4/5' }}>
            <Image src={bond.img} alt={bond.name} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.9)', padding: '0.8rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--color-black)' }}>
              {bond.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const AboutLegacy = () => {
  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', background: '#f9f9f9', border: '1px solid var(--color-gray-light)' }}>
        <div style={{ padding: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', borderTop: '2px solid var(--color-black)', width: 'fit-content', paddingTop: '1rem' }}>ABOUT US</h2>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            We are one of the oldest business families in India with a family legacy of over 100 years in business. Started for the noble cause of nation-building, the forefathers believed ethical, honest and transparent business practices should form the foundation of the group.
          </p>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '2rem' }}>
            Having ventured into luxury jewellery retailing, we have expanded globally, setting the standard for purity and unparalleled craftsmanship.
          </p>
          <button style={{ background: 'transparent', border: '1px solid var(--color-black)', padding: '0.8rem 2rem', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>VIEW MORE</button>
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
