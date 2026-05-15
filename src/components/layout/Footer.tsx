import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

// Custom SVG Icons for social media since they are missing in this version of lucide-react
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-2 1-3.3 1.2c-.8-.9-2.1-1.4-3.5-1.4-2.6 0-4.8 2.2-4.8 4.8 0 .4 0 .7.1 1.1-3.9-.2-7.4-2.1-9.7-5.1-.4.6-.6 1.4-.6 2.2 0 1.6.8 3.1 2.1 3.9-.8 0-1.5-.2-2.1-.6v.1c0 2.2 1.6 4.1 3.7 4.5-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.8 2.3 3.2 4.3 3.2-1.6 1.3-3.6 2-5.7 2-1.1 0-2.2-.1-3.3-.3 2.1 1.3 4.5 2.1 7.1 2.1 8.5 0 13.2-7.1 13.2-13.2 0-.2 0-.4 0-.6 1-.7 1.8-1.6 2.5-2.6z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

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
                <a href="#" aria-label="Facebook"><FacebookIcon size={20} /></a>
                <a href="#" aria-label="Instagram"><InstagramIcon size={20} /></a>
                <a href="#" aria-label="Twitter"><TwitterIcon size={20} /></a>
                <a href="#" aria-label="Youtube"><YoutubeIcon size={20} /></a>
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
