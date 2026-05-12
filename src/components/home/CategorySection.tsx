"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CategorySection.module.css';

const categories = [
  {
    id: 1,
    title: 'Diamond Rings',
    image: '/rings.png',
    link: '/category/rings'
  },
  {
    id: 2,
    title: 'Elegant Earrings',
    image: '/earrings.png',
    link: '/category/earrings'
  }
];

const CategorySection = () => {
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
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={cat.link} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.exploreBtn}>Explore</span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
