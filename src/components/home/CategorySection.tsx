"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CategorySection.module.css';

interface Category {
  id: number;
  name: string;
  slug: string;
  img: string;
}

const CategorySection = ({ initialCategories }: { initialCategories?: Category[] }) => {
  const displayCategories = initialCategories || [
    { id: 1, name: 'Diamond Rings', img: '/rings.png', slug: 'rings' },
    { id: 2, name: 'Diamond Necklaces', img: '/necklaces.png', slug: 'necklaces' },
    { id: 3, name: 'Diamond Watches', img: '/watches.png', slug: 'watches' },
    { id: 4, name: 'Diamond Bangles', img: '/bangles.png', slug: 'bangles' },
    { id: 5, name: 'Diamond Earrings', img: '/earrings.png', slug: 'earrings' },
    { id: 6, name: 'Other Jewellery', img: '/rings.png', slug: 'other' }
  ];

  const getValidImg = (url: string | undefined | null) => {
    if (!url) return '/rings.png';
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return `/${url}`;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Curated Collections
          </motion.h2>
          <p className={styles.subtitle}>Discover our exquisite range of fine diamond jewellery, crafted for eternity.</p>
        </div>

        <div className={styles.grid}>
          {displayCategories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/category/${cat.slug}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={getValidImg(cat.img)} 
                    alt={cat.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.exploreBtn}>Explore</span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
