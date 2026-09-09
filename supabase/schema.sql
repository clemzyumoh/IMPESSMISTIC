-- Run this in the Supabase SQL editor once, before launch.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contact
  full_name text not null,
  phone text not null,
  email text not null,

  -- property
  property_address text not null,
  city text,
  state text,
  zip text,
  property_type text,        -- single-family, multi-family, land, condo, commercial
  bedrooms text,
  bathrooms text,
  approx_square_footage text,
  year_built text,

  -- situation
  ownership_status text,     -- own outright, mortgaged, inherited, other
  has_mortgage boolean,
  mortgage_balance text,
  is_occupied boolean,
  occupant_type text,        -- owner-occupied, tenant, vacant
  condition text,            -- move-in ready, needs minor work, needs major work, teardown
  reason_for_selling text,
  timeline text,             -- asap, 30 days, 90 days, flexible

  -- media
  photo_urls text[] default '{}',

  -- extra
  additional_notes text,

  -- pipeline (admin-managed)
  status text not null default 'new', -- new, contacted, offer_made, closed, dead
  internal_notes text
);

alter table leads enable row level security;

-- Allow anyone (anon key) to INSERT a lead — the public form needs this.
create policy "public can submit leads"
  on leads for insert
  to anon
  with check (true);

-- No SELECT/UPDATE/DELETE policy for anon — the dashboard reads/writes
-- through the server-side service role key only, never the browser.

-- Storage bucket for property photos.
insert into storage.buckets (id, name, public)
values ('property-photos', 'property-photos', true)
on conflict (id) do nothing;

create policy "public can upload property photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'property-photos');

create policy "public can read property photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'property-photos');
