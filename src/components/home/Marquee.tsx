import React from 'react';
import { Diamond } from 'lucide-react';
import styles from './Marquee.module.css';

const Marquee = () => {
  const items = [
    "Free Shipping Across India",
    "Certified Natural Diamonds",
    "Hallmarked Jewellery",
    "Secure Payments",
    "Easy Returns",
    "Luxury Packaging",
    "Lifetime Support",
    "Trusted by Thousands"
  ];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        {[...items, ...items].map((item, index) => (
          <div key={index} className={styles.marqueeItem}>
            <Diamond size={16} className={styles.icon} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
