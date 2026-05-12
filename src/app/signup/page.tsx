"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const FloatingDiamond = ({ delay, duration, size, left, top }: any) => (
  <motion.div
    initial={{ y: 0, opacity: 0.1, rotate: 0 }}
    animate={{ 
      y: [0, -100, 0], 
      opacity: [0.1, 0.4, 0.1],
      rotate: [0, 180, 360] 
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
    style={{
      position: 'absolute',
      left: `${left}%`,
      top: `${top}%`,
      pointerEvents: 'none',
      color: 'var(--color-gold-dark)',
      filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))'
    }}
  >
    <Diamond size={size} strokeWidth={1.5} />
  </motion.div>
);

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/signup`, 
      },
    });
    if (error) {
      alert('Google Login failed: ' + error.message + '\n\nNote: You need to configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
    }
  };

  // Background diamond config
  const diamonds = [
    { delay: 0, duration: 15, size: 40, left: 10, top: 20 },
    { delay: 5, duration: 20, size: 24, left: 85, top: 15 },
    { delay: 2, duration: 18, size: 32, left: 75, top: 75 },
    { delay: 7, duration: 25, size: 48, left: 15, top: 80 },
    { delay: 10, duration: 12, size: 20, left: 50, top: 10 },
    { delay: 15, duration: 22, size: 36, left: 45, top: 85 },
    { delay: 3, duration: 16, size: 28, left: 90, top: 50 },
    { delay: 8, duration: 19, size: 30, left: 5, top: 50 },
  ];

  return (
    <div style={{ position: 'relative', display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '8rem 2rem 5rem', overflow: 'hidden' }}>
      
      {/* 3D Animated Background Elements */}
      {diamonds.map((d, i) => (
        <FloatingDiamond key={i} {...d} />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        style={{ position: 'relative', zIndex: 10, background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(16px)', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset', width: '100%', maxWidth: '450px', border: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        
        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '2rem', position: 'relative' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', color: isLogin ? 'var(--color-black)' : 'var(--color-gray)', fontWeight: isLogin ? 'bold' : 'normal', fontSize: '1.1rem', cursor: 'pointer', zIndex: 2 }}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', color: !isLogin ? 'var(--color-black)' : 'var(--color-gray)', fontWeight: !isLogin ? 'bold' : 'normal', fontSize: '1.1rem', cursor: 'pointer', zIndex: 2 }}
          >
            Sign Up
          </button>
          <motion.div 
            initial={false}
            animate={{ left: isLogin ? '0%' : '50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'absolute', bottom: 0, width: '50%', height: '2px', background: 'var(--color-gold-dark)', zIndex: 1 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.form 
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} 
            onSubmit={(e) => e.preventDefault()}
          >
            {!isLogin && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>First Name</label>
                  <input type="text" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-gold-dark)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-light)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Last Name</label>
                  <input type="text" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-gold-dark)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-light)'} />
                </div>
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Email Address</label>
              <input type="email" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-gold-dark)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-light)'} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Password</label>
                {isLogin && <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textDecoration: 'none' }}>Forgot Password?</a>}
              </div>
              <input type="password" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-gold-dark)'} onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-light)'} />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#000' }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-light)' }}></div>
            <span style={{ padding: '0 1rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-light)' }}></div>
          </div>
          
          <motion.button 
            onClick={handleGoogleLogin}
            whileTap={{ scale: 0.98 }}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              background: 'white', 
              border: '1px solid var(--color-gray-light)', 
              borderRadius: '4px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.8rem', 
              cursor: 'pointer',
              fontWeight: '500',
              color: 'var(--color-black)',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </motion.button>
          <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--color-gray)', lineHeight: '1.4' }}>
            By continuing, you agree to Aura's Terms of Service and Privacy Policy. We use this data for secure human verification and personalized luxury marketing.
          </p>
        </div>

      </motion.div>
    </div>
  );
}
