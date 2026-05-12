import React from 'react';
import Image from 'next/image';

export default async function CustomRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--color-black)', marginBottom: '2rem' }}>Customer Design</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Left Column: Details */}
        <div style={{ background: 'var(--color-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ color: 'var(--color-black)' }}><strong>Name:</strong> Sriyansh Nahar</p>
            <p style={{ color: 'var(--color-black)' }}><strong>Phone:</strong> 8302181553</p>
            <p style={{ color: 'var(--color-black)' }}><strong>Email:</strong> sriyanshnahar@gmail.com</p>
            <p style={{ color: 'var(--color-black)' }}><strong>Jewellery:</strong> Diamond Ring</p>
            <p style={{ color: 'var(--color-black)' }}><strong>Metal:</strong> 18K Yellow Gold</p>
            <p style={{ color: 'var(--color-black)' }}><strong>Budget:</strong> ₹1,00,000 - ₹5,00,000</p>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--color-black)', marginBottom: '0.5rem' }}><strong>Notes:</strong></p>
              <p style={{ color: 'var(--color-gray)', lineHeight: '1.6' }}>
                I would like a custom vintage rose cut diamond ring. Please keep the design minimalistic but luxurious. I have attached some inspiration images.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Images */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: 'var(--color-white)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
              <Image src="/rings.png" alt="Design 1" fill style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-gray)' }}>Design 1</p>
          </div>
          
          <div style={{ background: 'var(--color-white)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-gray-light)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{ color: 'var(--color-gray)' }}>No additional image</p>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-gray)' }}>Design 2</p>
          </div>
        </div>

      </div>
    </div>
  );
}
