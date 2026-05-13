"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { cart, wishlist } = useCart();
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navClass = `${styles.header} ${scrolled ? styles.scrolled : ''} ${!isHomePage ? styles.internalPage : ''}`;

  return (
    <header className={navClass}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className={`${styles.desktopNav}`}>
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
                placeholder="Search..." 
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
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist" style={{ position: 'relative' }}>
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--color-gold-dark)', color: 'white', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '50%', fontWeight: 'bold' }}>
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart" style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--color-black)', color: 'white', fontSize: '0.65rem', padding: '1px 5px', borderRadius: '50%', fontWeight: 'bold' }}>
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link href="/signup" className={styles.iconBtn} aria-label="Profile"><User size={20} /></Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)}></div>}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button className={styles.closeMenuBtn} onClick={() => setMobileMenuOpen(false)}>
          <X size={24} />
        </button>
        <div className={styles.mobileLinks}>
          <Link href="/category" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
          <Link href="/custom-design" onClick={() => setMobileMenuOpen(false)}>Custom Design</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
