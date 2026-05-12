import React from 'react';

export default function ReturnsPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>Returns & Exchanges</h1>
        <p style={{ color: 'var(--color-gray)', lineHeight: 1.8, textAlign: 'center', marginBottom: '4rem' }}>Your satisfaction is our absolute priority. We offer a transparent, hassle-free policy.</p>
        
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-black)', marginBottom: '1rem' }}>14-Day Money Back Guarantee</h3>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            If you are not completely enchanted by your purchase, you can return your item within 14 days of delivery for a 100% full refund. The item must be unworn, in its pristine original condition, and returned with the original certificates, packaging, and invoice.
          </p>
          <ul style={{ color: 'var(--color-gray)', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Customized, engraved, or bespoke items are strictly non-returnable.</li>
            <li>Refunds will be processed to the original payment method within 7-10 business days of receiving and inspecting the returned item.</li>
          </ul>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-black)', marginBottom: '1rem' }}>Lifetime Exchange Policy</h3>
          <p style={{ color: 'var(--color-gray)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Jewellery is an investment. Should you wish to upgrade your Aura piece in the future, we gladly offer a Lifetime Exchange.
          </p>
          <ul style={{ color: 'var(--color-gray)', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Gold / Platinum:</strong> Exchanged at 100% of the prevailing market rate.</li>
            <li><strong>Diamonds:</strong> Exchanged at 90% of the prevailing market rate based on original carat weight and quality.</li>
            <li>Making charges and taxes from the original purchase are excluded from the exchange value.</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: 'var(--color-beige)', borderRadius: '4px', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-black)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>How to initiate a return?</h4>
          <p style={{ color: 'var(--color-gray)' }}>Please contact our support team at <strong>support@aurajewellery.com</strong> or call us at <strong>1800-123-AURA</strong>. We will arrange a complimentary, insured reverse pickup from your address.</p>
        </div>
      </div>
    </div>
  );
}
