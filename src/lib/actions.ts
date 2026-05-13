import { supabase } from './supabase';

export async function getBestsellers() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_bestseller', true);

  if (error) {
    console.error('Error fetching bestsellers:', error);
    return [];
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
}
