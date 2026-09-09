import { createClient } from "@supabase/supabase-js";

// Client-side (browser) client — uses the public anon key.
// Row Level Security policies in Supabase control what this key can do.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side client — uses the service role key, full access.
// Only ever import this in server code (API routes, Server Components).
// NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
