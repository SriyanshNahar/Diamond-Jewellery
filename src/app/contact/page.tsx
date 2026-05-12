"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>We are here to assist you with any inquiries regarding our collections or services.</p>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Contact Details */}
          <div className={styles.infoSection}>
            <h2 className={styles.heading}>Get In Touch</h2>
            <p className={styles.text}>Our luxury consultants are available to help you find the perfect piece or guide you through the custom design process.</p>
            
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>1800-123-AURA (Toll Free)</p>
                  <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Mail size={24} /></div>
                <div>
                  <h4>Email</h4>
                  <p>support@aurajewellery.com</p>
                  <p>We aim to reply within 24 hours.</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h4>Boutique Address</h4>
                  <p>123 Luxury Avenue, Diamond District,</p>
                  <p>Mumbai 400001, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            {submitted ? (
              <div className={styles.successBox}>
                <h3>Message Sent</h3>
                <p>Thank you for reaching out. A consultant will contact you shortly.</p>
                <button className="btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Send a Message</h3>
                
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input type="text" required className={styles.input} />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <input type="email" required className={styles.input} />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  <select className={styles.input} required>
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea rows={5} required className={styles.input}></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
