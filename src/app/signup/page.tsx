"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '8rem 2rem 5rem' }}>
      <div style={{ background: 'var(--color-white)', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', border: '1px solid var(--color-gray-light)' }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid var(--color-gray-light)' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: isLogin ? '2px solid var(--color-gold-dark)' : '2px solid transparent', color: isLogin ? 'var(--color-gold-dark)' : 'var(--color-gray)', fontWeight: isLogin ? 'bold' : 'normal', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: !isLogin ? '2px solid var(--color-gold-dark)' : '2px solid transparent', color: !isLogin ? 'var(--color-gold-dark)' : 'var(--color-gray)', fontWeight: !isLogin ? 'bold' : 'normal', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            Sign Up
          </button>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>First Name</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Last Name</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none' }} />
              </div>
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Password</label>
              {isLogin && <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', textDecoration: 'none' }}>Forgot Password?</a>}
            </div>
            <input type="password" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--color-gray-light)', borderRadius: '4px', outline: 'none' }} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

      </div>
    </div>
  );
}
