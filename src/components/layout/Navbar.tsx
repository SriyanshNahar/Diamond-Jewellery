"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navClass = `${styles.header} ${scrolled ? styles.scrolled : ''} ${!isHomePage ? styles.internalPage : ''}`;

  return (
    <header className={navClass}>
      <div className={styles.topBar}>
        <p>Free Shipping Across India | Certified Natural Diamonds</p>
      </div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.dropdownContainer}>
            <Link href="/category" className={styles.link}>
              Collections <ChevronDown size={14} className={styles.dropdownIcon} />
            </Link>
            <div className={styles.dropdownMenu}>
              <Link href="/category/rings" className={styles.dropdownItem}>Diamond Rings</Link>
              <Link href="/category/bangles" className={styles.dropdownItem}>Diamond Bangles</Link>
              <Link href="/category/watches" className={styles.dropdownItem}>Diamond Watches</Link>
              <Link href="/category/necklaces" className={styles.dropdownItem}>Diamond Necklaces</Link>
              <Link href="/category/earrings" className={styles.dropdownItem}>Diamond Earrings</Link>
              <Link href="/category/other" className={styles.dropdownItem}>Other Jewellery</Link>
            </div>
          </div>
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
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input 
                type="text" 
                placeholder="Search jewellery..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onBlur={() => !searchQuery && setSearchOpen(false)}
              />
              <button type="submit" className={styles.iconBtn} aria-label="Submit Search"><Search size={20} /></button>
            </form>
          ) : (
            <button className={styles.iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={20} /></button>
          )}
          <button className={styles.iconBtn} aria-label="Wishlist"><Heart size={20} /></button>
          <button className={styles.iconBtn} aria-label="Cart"><ShoppingBag size={20} /></button>
          <Link href="/login" className={styles.iconBtn} aria-label="Profile"><User size={20} /></Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
