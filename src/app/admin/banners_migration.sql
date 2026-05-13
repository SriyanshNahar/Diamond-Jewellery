-- ============================================================
-- STEP 1: Add responsive image columns to banners table
-- ============================================================
ALTER TABLE banners ADD COLUMN IF NOT EXISTS desktop_image_url TEXT;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS tablet_image_url TEXT;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS mobile_image_url TEXT;

-- ============================================================
-- STEP 2: Fix Row Level Security (RLS) for banners table
-- ============================================================

-- Disable RLS completely on banners (simplest fix for admin use)
ALTER TABLE banners DISABLE ROW LEVEL SECURITY;

-- OR if you want to keep RLS but allow all operations:
-- DROP POLICY IF EXISTS "Allow all" ON banners;
-- CREATE POLICY "Allow all" ON banners FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- STEP 3: Fix RLS for products table (if also getting errors)
-- ============================================================
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 4: Fix RLS for feedbacks table
-- ============================================================
ALTER TABLE feedbacks DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 5: Fix RLS for orders table
-- ============================================================
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 6: Fix RLS for contacts table
-- ============================================================
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 7: Fix RLS for custom_requests table
-- ============================================================
ALTER TABLE custom_requests DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 8: Allow public read/write on Storage bucket
-- ============================================================
-- Run this only if image uploads also fail.
-- Go to: Storage > product-images bucket > Policies
-- Add a policy: Allow INSERT for all (public) users
