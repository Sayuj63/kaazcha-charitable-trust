import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "__Host-kct_admin";
const MAX_AGE_S = 60 * 60 * 24 * 7;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Compares against ADMIN_USERNAME / ADMIN_PASSWORD without leaking timing. */
export function checkCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  if (!u || !p) return false;
  // Hash both sides so lengths match before the constant-time compare.
  const h = (s: string) => sign(`cred:${s}`);
  const userOk = safeEqual(h(username.trim().toLowerCase()), h(u.toLowerCase()));
  const passOk = safeEqual(h(password), h(p));
  return userOk && passOk;
}

export function sessionCookie() {
  const payload = `v1.${Date.now() + MAX_AGE_S * 1000}`;
  const token = `${payload}.${sign(payload)}`;
  return `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE_S}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearedCookie() {
  return `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export function isAuthed(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  const match = header
    .split(/;\s*/)
    .find((part) => part.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const token = match.slice(COOKIE.length + 1);
  const [version, exp, mac] = token.split(".");
  if (version !== "v1" || !exp || !mac) return false;
  if (!safeEqual(mac, sign(`${version}.${exp}`))) return false;
  return Number(exp) > Date.now();
}
