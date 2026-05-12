"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Are your diamonds ethically sourced?",
    answer: "Yes, absolutely. At Aura Fine Jewellery, we adhere to the strict guidelines of the Kimberley Process. Every diamond in our collection is 100% natural, certified, and sourced ethically from conflict-free zones."
  },
  {
    question: "Do your products come with certification?",
    answer: "Every piece of diamond jewellery is accompanied by a Certificate of Authenticity from internationally recognized gemological laboratories such as GIA, IGI, or SGL, ensuring the exact carat, cut, color, and clarity."
  },
  {
    question: "Can I customize a piece of jewellery?",
    answer: "Yes, our Custom Design Studio allows you to create bespoke masterpieces. Simply upload your inspiration images and requirements, and our master artisans will work closely with you to bring your vision to life."
  },
  {
    question: "How should I care for my diamond jewellery?",
    answer: "We recommend cleaning your diamonds regularly with a soft brush and mild soapy water. Avoid wearing them during heavy physical activities and store them separately in velvet-lined boxes to prevent scratching."
  },
  {
    question: "What is your lifetime exchange policy?",
    answer: "We offer a 100% Lifetime Exchange value on the prevailing market price of the gold, and 90% exchange value on the diamonds. Upgrading your aura is always a seamless experience with us."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, textAlign: 'center', marginBottom: '4rem' }}>Find answers to common questions about our diamonds, ordering process, and care guidelines below.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid var(--color-gray-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{ width: '100%', padding: '1.5rem', background: openIdx === idx ? 'var(--color-beige)' : 'var(--color-white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease' }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-black)' }}>{faq.question}</span>
                {openIdx === idx ? <ChevronUp size={20} color="var(--color-gold-dark)" /> : <ChevronDown size={20} color="var(--color-gray)" />}
              </button>
              {openIdx === idx && (
                <div style={{ padding: '1.5rem', background: 'var(--color-white)', borderTop: '1px solid var(--color-gray-light)', color: 'var(--color-gray)', lineHeight: '1.8' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
