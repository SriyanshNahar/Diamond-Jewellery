import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Our Heritage</h1>
          <p className={styles.subtitle}>
            A legacy of unmatched craftsmanship, ethically sourced diamonds, and timeless luxury.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.heading}>The Aura Promise</h2>
              <p className={styles.text}>
                Founded on the belief that luxury should be accessible and transparent, Aura Fine Jewellery is committed to revolutionizing how you experience fine diamonds. Much like the industry pioneers we admire, our mission is to provide you with an unforgettable journey from selection to ownership.
              </p>
              <p className={styles.text}>
                Every diamond is handpicked by our gemologists and ethically sourced to ensure conflict-free brilliance. Our master artisans blend traditional Indian craftsmanship with contemporary global designs to create pieces that become family heirlooms.
              </p>
            </div>
            <div className={styles.imageBox}>
              <Image 
                src="/hero.png" 
                alt="Craftsmanship" 
                fill 
                className={styles.image} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.heading} style={{ textAlign: 'center', marginBottom: '4rem' }}>Why Choose Us</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>100% Certified</h3>
              <p>Every diamond comes with an internationally recognized certificate of authenticity.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Lifetime Exchange</h3>
              <p>Upgrade your jewellery anytime with our 100% lifetime exchange policy.</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Ethically Sourced</h3>
              <p>We are strictly committed to offering only conflict-free, ethically mined diamonds.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
