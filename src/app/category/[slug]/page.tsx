import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const placeholderProducts = [
  { id: 1, name: 'Eternity Diamond Band', price: '₹ 45,000', image: '/rings.png' },
  { id: 2, name: 'Royal Solitaire', price: '₹ 1,25,000', image: '/rings.png' },
  { id: 3, name: 'Classic Halo Design', price: '₹ 85,000', image: '/rings.png' },
  { id: 4, name: 'Vintage Rose Cut', price: '₹ 65,000', image: '/rings.png' },
  { id: 5, name: 'Minimalist Promise', price: '₹ 35,000', image: '/rings.png' },
  { id: 6, name: 'Luxury Diamond Stack', price: '₹ 1,50,000', image: '/rings.png' },
];

export default async function CategoryDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const title = getCategoryTitle(resolvedParams.slug);

  return (
    <div className={styles.container}>
      {/* Category Banner */}
      <div className={styles.banner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>Discover our exclusive collection of meticulously crafted {title.toLowerCase()}.</p>
      </div>

      <div className="container">
        {/* Filters and Sorting bar */}
        <div className={styles.toolbar}>
          <div className={styles.filterBtn}>Filter / Sort</div>
          <div className={styles.resultsCount}>{placeholderProducts.length} Results</div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {placeholderProducts.map((product) => (
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
      </div>
    </div>
  );
}
