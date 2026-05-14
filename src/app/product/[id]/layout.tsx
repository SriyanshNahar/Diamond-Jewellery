import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found | Aura',
    };
  }

  const p = product as any;

  return {
    title: `${p.name} | Aura Jewellery`,
    description: p.promo || `Buy the exquisite ${p.name} from Aura Jewellery.`,
    openGraph: {
      title: `${p.name} | Aura Jewellery`,
      description: p.promo || `Buy the exquisite ${p.name} from Aura Jewellery.`,
      images: [{ url: p.img }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} | Aura Jewellery`,
      description: p.promo || `Buy the exquisite ${p.name} from Aura Jewellery.`,
      images: [p.img],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
