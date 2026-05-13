export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          price: number
          old_price: number | null
          rating: number | null
          reviews: number | null
          promo: string | null
          img: string
          category_id: number | null
          is_bestseller: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          price: number
          old_price?: number | null
          rating?: number | null
          reviews?: number | null
          promo?: string | null
          img: string
          category_id?: number | null
          is_bestseller?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          price?: number
          old_price?: number | null
          rating?: number | null
          reviews?: number | null
          promo?: string | null
          img?: string
          category_id?: number | null
          is_bestseller?: boolean
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          img: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          img: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          img?: string
        }
      }
    }
  }
}
