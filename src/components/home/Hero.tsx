"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageWrapper}>
        <Image 
          src="/hero.png" 
          alt="Luxury Diamond Necklace" 
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Aura Fine Jewellery
        </motion.p>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Elegance <br /> Redefined.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn-primary">Explore Collection</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
