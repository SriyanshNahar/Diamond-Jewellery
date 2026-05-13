"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from 'lucide-react';

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
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 0 && !['6','7','8','9'].includes(digits[0])) {
      setPhoneError('Number must start with 6, 7, 8, or 9');
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Enter a valid 10-digit mobile number');
    } else {
      setPhoneError('');
    }
    setPhone(digits.slice(0, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccess('');
    if (!isLogin && phoneError) return;
    setLoading(true);

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
      else { setSuccess('Logged in successfully! Redirecting...'); setTimeout(() => window.location.href = '/', 1500); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, last_name: lastName, phone: '+91' + phone } } });
      if (error) setAuthError(error.message);
      else setSuccess('Account created! Please check your email to verify.');
    }
    setLoading(false);
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

  const inputStyle = { width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s', fontSize: '0.95rem' };
  const onFocus = (e: any) => e.target.style.borderColor = 'var(--color-gold-dark)';
  const onBlur = (e: any) => e.target.style.borderColor = 'var(--color-gray-light)';

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
        style={{ position: 'relative', zIndex: 10, background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(16px)', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset', width: '100%', maxWidth: '460px', border: '1px solid rgba(212, 175, 55, 0.2)' }}
      >
        
        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '2rem', position: 'relative' }}>
          <button 
            onClick={() => { setIsLogin(true); setAuthError(''); setSuccess(''); }}
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', color: isLogin ? 'var(--color-black)' : 'var(--color-gray)', fontWeight: isLogin ? 'bold' : 'normal', fontSize: '1.1rem', cursor: 'pointer', zIndex: 2 }}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setAuthError(''); setSuccess(''); }}
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

        {authError && <p style={{ color: '#ef4444', background: '#fee2e2', padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{authError}</p>}
        {success && <p style={{ color: '#166534', background: '#dcfce7', padding: '0.6rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{success}</p>}

        <AnimatePresence mode="wait">
          <motion.form 
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} 
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>First Name</label>
                  <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Last Name</label>
                  <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            {!isLogin && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Mobile Number</label>
                <div style={{ display: 'flex', gap: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 0.8rem', background: '#f5f5f5', border: '1px solid var(--color-gray-light)', borderRight: 'none', borderRadius: '4px 0 0 4px', fontSize: '0.9rem', color: 'var(--color-black)', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    🇮🇳 +91
                  </div>
                  <input 
                    type="tel" 
                    required
                    placeholder="9XXXXXXXXX"
                    value={phone}
                    onChange={e => validatePhone(e.target.value)}
                    maxLength={10}
                    style={{ ...inputStyle, borderRadius: '0 4px 4px 0', flex: 1, borderColor: phoneError ? '#ef4444' : 'var(--color-gray-light)' }} 
                    onFocus={onFocus} 
                    onBlur={onBlur} 
                  />
                </div>
                {phoneError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem' }}>{phoneError}</p>}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Password</label>
                {isLogin && <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textDecoration: 'none' }}>Forgot Password?</a>}
              </div>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#000' }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', background: 'var(--color-black)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s', fontSize: '1rem', fontWeight: '600' }}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-gray)', lineHeight: '1.4' }}>
            By continuing, you agree to Aura's Terms of Service and Privacy Policy.
          </p>
        </div>

      </motion.div>
    </div>
  );
}
