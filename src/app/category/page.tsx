import React from 'react';
import CategorySection from '@/components/home/CategorySection';

export default function CategoryPage() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Reusing the CategorySection we built for the homepage */}
      <CategorySection />
    </div>
  );
}
