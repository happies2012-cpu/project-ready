-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS Profile Table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- PRODUCTS / SERVICES
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

create policy "Products are viewable by everyone."
  on products for select
  using ( true );

create policy "Only admins can modify products."
  on products for all
  using ( auth.uid() in (select id from profiles where role = 'admin') );

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  status text default 'pending', -- pending, paid, failed, delivered
  total_amount decimal(10,2) not null,
  currency text default 'USD',
  payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Users can view their own orders."
  on orders for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own orders."
  on orders for insert
  with check ( auth.uid() = user_id );

-- MARKETING CONTENT (For dynamic AI content)
create table public.marketing_content (
  id uuid default uuid_generate_v4() primary key,
  section_name text not null, -- e.g., 'hero', 'testimonials'
  content jsonb not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.marketing_content enable row level security;

create policy "Marketing content is viewable by everyone."
  on marketing_content for select
  using ( true );

-- SUBSCRIPTIONS
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  plan_id text not null,
  status text default 'active',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscriptions."
  on subscriptions for select
  using ( auth.uid() = user_id );

-- EDGE FUNCTION JWT VALIDATION HELPERS
-- (This is handled by Supabase Auth automatically via the Authorization header)
