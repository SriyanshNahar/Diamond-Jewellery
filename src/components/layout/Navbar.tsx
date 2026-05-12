"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.topBar}>
        <p>Free Shipping Across India | Certified Natural Diamonds</p>
      </div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/category" className={styles.link}>Collections</Link>
          <Link href="/custom-design" className={styles.link}>Custom</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        
        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            AURA
          </Link>
        </div>

        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Search"><Search size={20} /></button>
          <button className={styles.iconBtn} aria-label="Wishlist"><Heart size={20} /></button>
          <button className={styles.iconBtn} aria-label="Cart"><ShoppingBag size={20} /></button>
          <Link href="/login" className={styles.iconBtn} aria-label="Profile"><User size={20} /></Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
