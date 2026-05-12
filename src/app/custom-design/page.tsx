"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function CustomDesignPage() {
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <motion.div 
          className={styles.successMessage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 size={64} className={styles.successIcon} />
          <h1 className={styles.title}>Request Received</h1>
          <p className={styles.subtitle}>Our master artisans will review your dream design and contact you within 24 hours.</p>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Create Your Masterpiece
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Upload your inspiration and let our expert craftsmen bring your vision to life.
        </motion.p>
      </div>

      <motion.div 
        className={styles.formWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            
            {/* Image Upload Section */}
            <div className={styles.uploadSection}>
              <h3 className={styles.sectionTitle}>Inspiration Images</h3>
              <p className={styles.helpText}>Upload up to 5 images of designs you love.</p>
              
              <div className={styles.uploadBox}>
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <label htmlFor="file-upload" className={styles.uploadLabel}>
                  <Upload size={32} className={styles.uploadIcon} />
                  <span>Click or drag images here</span>
                </label>
              </div>

              {images.length > 0 && (
                <div className={styles.imagePreviewGrid}>
                  {images.map((src, idx) => (
                    <div key={idx} className={styles.imagePreview}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`Preview ${idx + 1}`} />
                      <button type="button" onClick={() => removeImage(idx)} className={styles.removeBtn}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Details Section */}
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Design Details</h3>
              
              <div className={styles.inputGroup}>
                <label>Jewellery Type</label>
                <select required className={styles.input}>
                  <option value="">Select Type</option>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Preferred Metal</label>
                  <select required className={styles.input}>
                    <option value="">Select Metal</option>
                    <option value="18k-gold">18K Yellow Gold</option>
                    <option value="18k-white">18K White Gold</option>
                    <option value="18k-rose">18K Rose Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Estimated Budget</label>
                  <select required className={styles.input}>
                    <option value="">Select Range</option>
                    <option value="under-50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                    <option value="1l-5l">₹1,00,000 - ₹5,00,000</option>
                    <option value="above-5l">Above ₹5,00,000</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Additional Notes</label>
                <textarea 
                  rows={4} 
                  className={styles.input}
                  placeholder="Describe your vision, specific gemstone requirements, or engraving details..."
                ></textarea>
              </div>

              <div className={styles.divider}></div>
              <h3 className={styles.sectionTitle}>Contact Information</h3>

              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" required className={styles.input} placeholder="e.g. Ananya Sharma" />
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <input type="email" required className={styles.input} placeholder="you@example.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input type="tel" required className={styles.input} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                Request Consultation
              </button>
            </div>

          </div>
        </form>
      </motion.div>
    </div>
  );
}
