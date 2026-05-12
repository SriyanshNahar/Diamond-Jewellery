import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../category/[slug]/page.module.css';

const placeholderProducts = [
  { id: 1, name: 'Eternity Diamond Band', price: '₹ 45,000', image: '/rings.png', category: 'rings' },
  { id: 2, name: 'Royal Solitaire', price: '₹ 1,25,000', image: '/rings.png', category: 'rings' },
  { id: 3, name: 'Diamond Tennis Bracelet', price: '₹ 2,85,000', image: '/rings.png', category: 'bangles' },
  { id: 4, name: 'Vintage Rose Cut Necklace', price: '₹ 3,65,000', image: '/rings.png', category: 'necklaces' },
  { id: 5, name: 'Luxury Diamond Watch', price: '₹ 5,35,000', image: '/rings.png', category: 'watches' },
  { id: 6, name: 'Diamond Drop Earrings', price: '₹ 1,50,000', image: '/earrings.png', category: 'earrings' },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  
  // Basic search filter
  const results = placeholderProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.title}>Search Results</h1>
        <p className={styles.subtitle}>
          {query ? `Showing results for "${query}"` : 'Please enter a search term'}
        </p>
      </div>

      <div className="container">
        <div className={styles.toolbar}>
          <div className={styles.filterBtn}>Filter / Sort</div>
          <div className={styles.resultsCount}>{results.length} Results</div>
        </div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.imageBox}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className={styles.productImage} 
                  />
                  <div className={styles.hoverActions}>
                    <button className={styles.actionBtn}>View Details</button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2 style={{ color: 'var(--color-black)', marginBottom: '1rem' }}>No results found</h2>
            <p style={{ color: 'var(--color-gray)' }}>We couldn't find any jewellery matching "{query}". Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
