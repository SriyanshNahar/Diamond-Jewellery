import { supabase } from './supabase';

export async function getBestsellers() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_bestseller', true);

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error || !data || data.length === 0) {
    return undefined;
  }

  return data;
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  if (error || !data) {
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
    return false;
  }

  return true;
}
