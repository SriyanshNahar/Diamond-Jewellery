import React from 'react';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '8rem 2rem 5rem', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--color-white)', padding: '4rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--color-gray-light)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', fontFamily: 'var(--font-heading)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--color-gray)', marginBottom: '2rem' }}>Last Updated: January 2026</p>
        
        <div style={{ color: 'var(--color-gray)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>At Aura Fine Jewellery, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>1. Information We Collect</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (first name, last name), Contact Data (billing address, delivery address, email address and telephone numbers), Financial Data (payment card details are processed securely by our payment gateways and not stored on our servers), and Transaction Data (details about payments to and from you and other details of products you have purchased from us).</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>2. How We Use Your Data</h3>
          <p style={{ marginBottom: '1.5rem' }}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you (such as processing an order). Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</p>

          <h3 style={{ color: 'var(--color-black)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.3rem' }}>3. Data Security</h3>
          <p style={{ marginBottom: '1.5rem' }}>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          
          <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer at privacy@aurajewellery.com.</p>
        </div>
      </div>
    </div>
  );
}
