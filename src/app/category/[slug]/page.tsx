import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

const getCategoryTitle = (slug: string) => {
  const map: Record<string, string> = {
    'rings': 'Diamond Rings',
    'bangles': 'Diamond Bangles',
    'watches': 'Diamond Watches',
    'necklaces': 'Diamond Necklaces',
    'earrings': 'Diamond Earrings',
    'other': 'Other Diamond Jewellery'
  };
  return map[slug] || 'Diamond Jewellery';
};

export default async function CategoryDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const title = getCategoryTitle(resolvedParams.slug);

  // Fetch Category
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', resolvedParams.slug)
    .single();

  let products = [];
  if (category) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id);
    products = data || [];
  } else {
    // fallback to fetch all products for 'other' or unmatched
    const { data } = await supabase
      .from('products')
      .select('*')
      .limit(20);
    products = data || [];
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={styles.container}>
      {/* Category Banner */}
      <div className={styles.banner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>Discover our exclusive collection of meticulously crafted {title.toLowerCase()}.</p>
      </div>

      <div className="container">
        {/* Filters and Sorting bar */}
        <div className={styles.toolbar} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div className={styles.filterBtn} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Filter / Sort</div>
          <div className={styles.resultsCount} style={{ color: '#666' }}>{products.length} Results</div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map((product: any) => (
            <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard} style={{ display: 'block', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
              <div className={styles.imageBox} style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
                <Image 
                  src={product.img || '/rings.png'} 
                  alt={product.name} 
                  fill 
                  className={styles.productImage} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.productInfo} style={{ padding: '1rem' }}>
                <h3 className={styles.productName} style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#111' }}>{product.name}</h3>
                <p className={styles.productPrice} style={{ fontWeight: 'bold', color: 'var(--color-gold-dark)' }}>{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
