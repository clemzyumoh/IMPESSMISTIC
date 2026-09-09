// Uses Web Crypto (globalThis.crypto.subtle) instead of Node's `crypto`
// module so this works in both the Node runtime (API routes) and the
// Edge runtime (middleware).

const COOKIE_NAME = "impessmistic_admin_session";

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-secret-change-me";
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// The session token is just an HMAC of the admin password using a server
// secret. It proves the caller once knew ADMIN_PASSWORD, without storing
// the password itself in the cookie.
export async function makeSessionToken(): Promise<string> {
  return hmacHex(sessionSecret(), process.env.ADMIN_PASSWORD || "");
}

export async function isValidSessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const expected = await makeSessionToken();
  if (token.length !== expected.length) return false;
  // Constant-time-ish comparison without Node's crypto.timingSafeEqual.
  let diff = 0;
  for (let i = 0; i < token.length; i++) {
    diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export { COOKIE_NAME };
