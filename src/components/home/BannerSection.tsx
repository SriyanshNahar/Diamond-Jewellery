"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSection() {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await (supabase.from('banners') as any)
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (data && data.length > 0) setBanners(data);
      setLoading(false);
    };
    fetchBanners();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading || banners.length === 0) return null;

  const banner = banners[current];

  // Pick the right image based on screen size using <picture> / CSS
  const desktopImg = banner.desktop_image_url || banner.image_url;
  const tabletImg = banner.tablet_image_url || desktopImg;
  const mobileImg = banner.mobile_image_url || tabletImg;

  const prev = () => setCurrent(p => (p - 1 + banners.length) % banners.length);
  const next = () => setCurrent(p => (p + 1) % banners.length);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      background: '#111',
    }}>
      {/* Responsive Banner Image using <picture> */}
      <picture style={{ display: 'block', width: '100%' }}>
        {mobileImg && <source media="(max-width: 640px)" srcSet={mobileImg} />}
        {tabletImg && <source media="(max-width: 1024px)" srcSet={tabletImg} />}
        {desktopImg && (
          <img
            src={desktopImg}
            alt={banner.title || 'Promotional Banner'}
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.5s ease',
            }}
          />
        )}
      </picture>

      {/* Text Overlay */}
      {(banner.title || banner.subtitle) && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.65) 30%, transparent 80%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 4rem',
        }}>
          {banner.subtitle && (
            <p style={{
              color: 'var(--color-gold)',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontWeight: '500',
            }}>
              {banner.subtitle}
            </p>
          )}
          {banner.title && (
            <h2 style={{
              color: 'white',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '500',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              maxWidth: '500px',
            }}>
              {banner.title}
            </h2>
          )}
          {banner.link && (
            <Link href={banner.link}>
              <button style={{
                background: 'var(--color-gold)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                width: 'fit-content',
                transition: 'background 0.3s ease',
              }}>
                Shop Now
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Navigation Arrows — only if multiple banners */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
              width: '44px', height: '44px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
              color: 'white', transition: 'background 0.3s',
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            style={{
              position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
              width: '44px', height: '44px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
              color: 'white', transition: 'background 0.3s',
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Dot indicators */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '0.5rem',
          }}>
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
