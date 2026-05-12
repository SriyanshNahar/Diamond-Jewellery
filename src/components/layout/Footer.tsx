import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className="container">
          <div className={styles.grid}>
            
            {/* Brand Info */}
            <div className={styles.brandCol}>
              <h2 className={styles.logo}>AURA</h2>
              <p className={styles.brandDesc}>
                Aura Fine Jewellery crafts timeless masterpieces with ethically sourced, certified natural diamonds. Elevating everyday elegance since 1998.
              </p>
              <div className={styles.socials}>
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linkCol}>
              <h3 className={styles.colTitle}>Shop By</h3>
              <ul className={styles.linkList}>
                <li><Link href="/category/rings">Diamond Rings</Link></li>
                <li><Link href="/category/earrings">Elegant Earrings</Link></li>
                <li><Link href="/category/necklaces">Necklaces & Pendants</Link></li>
                <li><Link href="/category/bracelets">Bracelets & Bangles</Link></li>
                <li><Link href="/category/custom">Custom Design</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.linkCol}>
              <h3 className={styles.colTitle}>Customer Care</h3>
              <ul className={styles.linkList}>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/shipping">Shipping Policy</Link></li>
                <li><Link href="/returns">Return & Exchange</Link></li>
                <li><Link href="/track-order">Track Order</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.contactCol}>
              <h3 className={styles.colTitle}>Get in Touch</h3>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>1800-123-AURA (Toll Free)</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <span>support@aurajewellery.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span>123 Luxury Avenue, Diamond District, Mumbai 400001, India</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className="container">
          <div className={styles.bottomFlex}>
            <p>&copy; {new Date().getFullYear()} Aura Fine Jewellery. All Rights Reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
