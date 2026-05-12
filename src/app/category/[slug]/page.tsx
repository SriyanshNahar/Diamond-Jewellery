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

const getProductsForCategory = (slug: string) => {
  // If the slug matches a known image, use it. Otherwise default to rings.
  const knownSlugs = ['rings', 'bangles', 'watches', 'necklaces', 'earrings'];
  const imageToUse = knownSlugs.includes(slug) ? `/${slug}.png` : '/rings.png';
  const titleToUse = getCategoryTitle(slug).replace('Diamond ', '');

  return [
    { id: 1, name: `Eternity ${titleToUse}`, price: '₹ 45,000', image: imageToUse },
    { id: 2, name: `Royal ${titleToUse}`, price: '₹ 1,25,000', image: imageToUse },
    { id: 3, name: `Classic ${titleToUse}`, price: '₹ 85,000', image: imageToUse },
    { id: 4, name: `Vintage ${titleToUse}`, price: '₹ 65,000', image: imageToUse },
    { id: 5, name: `Minimalist ${titleToUse}`, price: '₹ 35,000', image: imageToUse },
    { id: 6, name: `Luxury ${titleToUse}`, price: '₹ 1,50,000', image: imageToUse },
  ];
};

export default async function CategoryDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const title = getCategoryTitle(resolvedParams.slug);
  const products = getProductsForCategory(resolvedParams.slug);

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
          <div className={styles.resultsCount}>{products.length} Results</div>
        </div>

        {/* Product Grid */}
        <div className={styles.grid}>
          {products.map((product) => (
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
