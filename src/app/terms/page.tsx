import React from 'react';

export default function TermsPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Terms of Service</h1>
        <p style={{ color: 'var(--color-gray)', marginBottom: '2rem' }}>Last Updated: January 2026</p>
        
        <div style={{ color: 'var(--color-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>Welcome to Aura Fine Jewellery. By accessing or using our website, purchasing our products, or utilizing our Custom Design Studio, you agree to be bound by these Terms of Service. Please read them carefully.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. Product Descriptions and Certifications</h3>
          <p style={{ marginBottom: '1.5rem' }}>We attempt to be as accurate as possible in our product descriptions, including diamond weight, cut, color, and clarity. However, all carat weights and measurements are approximate. Every diamond purchase is accompanied by a recognized laboratory certificate, which acts as the ultimate guarantor of the stone's specifications.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. Pricing and Payment</h3>
          <p style={{ marginBottom: '1.5rem' }}>All prices are listed in Indian Rupees (INR) and are inclusive of GST. Prices of precious metals and diamonds are subject to market fluctuations. Aura reserves the right to adjust pricing on the website without prior notice. The price displayed at the time of checkout is the final price.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. Bespoke & Custom Designs</h3>
          <p style={{ marginBottom: '1.5rem' }}>For items created through our Custom Design Studio, a non-refundable 50% advance payment is required before production begins. Because custom pieces are uniquely tailored to your specifications, they are strictly exempt from our standard 14-day return and exchange policy.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>4. Intellectual Property</h3>
          <p style={{ marginBottom: '1.5rem' }}>All content included on this site, such as jewelry designs, text, graphics, logos, images, and software, is the property of Aura Fine Jewellery or its content suppliers and protected by international copyright laws. Unauthorized reproduction or replication of our designs is strictly prohibited.</p>
        </div>
      </div>
    </div>
  );
}
