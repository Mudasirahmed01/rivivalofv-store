// Supabase Configuration Template
// This file shows how to integrate with real Supabase backend
// Currently using mock backend (localStorage) for demo purposes

/*
INSTRUCTIONS FOR REAL BACKEND INTEGRATION:

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your project credentials from Settings > API
4. Install Supabase client: npm install @supabase/supabase-js
5. Replace the mock backend calls with real Supabase calls

ENVIRONMENT VARIABLES NEEDED:
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

DATABASE SCHEMA (SQL):

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  description TEXT,
  gsm_rating TEXT,
  fabric_details TEXT,
  category TEXT NOT NULL CHECK (category IN ('tops', 'bottoms')),
  homepage_slot TEXT,
  colors JSONB,
  tags TEXT[],
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Product Variants Table
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  stock_count INTEGER DEFAULT 0,
  sku TEXT UNIQUE NOT NULL
);

-- Users Table (handled by Supabase Auth)
-- Use Supabase Auth instead of custom users table

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  shipping DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  coupon_code TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  helpful INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupons Table
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  min_purchase DECIMAL(10,2),
  max_discount DECIMAL(10,2),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ROW LEVEL SECURITY (RLS) POLICIES:

-- Products: Public read, Admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are editable by admins only" ON products FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Orders: Users can only see their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews: Public read, authenticated users can create
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

EXAMPLE SUPABASE CLIENT SETUP:

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

EXAMPLE USAGE:

// Get all products
const { data: products, error } = await supabase
  .from('products')
  .select(`
    *,
    images:product_images(*),
    variants:product_variants(*)
  `)
  .eq('is_published', true)
  .order('created_at', { ascending: false });

// Create order
const { data: order, error } = await supabase
  .from('orders')
  .insert({
    user_id: user.id,
    items: cartItems,
    subtotal: subtotal,
    total: total,
    shipping_address: address,
    payment_method: 'cod',
  })
  .select()
  .single();

// User authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

*/

// For now, export a placeholder
export const supabaseConfig = {
  status: 'mock',
  message: 'Using localStorage mock backend. Replace with real Supabase integration for production.',
};
