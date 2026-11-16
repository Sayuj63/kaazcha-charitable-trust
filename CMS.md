# Content admin (CMS)

- **Admin URL**: secret, not stored in this repo. `src/admin/AdminGate.tsx` keeps only
  its SHA-256. Credentials are the `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars on Vercel;
  `SESSION_SECRET` signs the session cookie (rotate it to sign everyone out).
- **Storage**: Vercel Blob store `kaazcha-cms` (`BLOB_READ_WRITE_TOKEN`).
  JSON documents `cms/{people,magazines,articles,albums}.json`; uploads under `uploads/`.
- **API**: `api/public.ts` (CDN-cached reads), `api/admin.ts` (login + load/save, ETag-guarded),
  `api/upload.ts` (client-upload tokens, session-checked).
- **Personalities**: `/people/<slug>`. QR codes are static (`qrcode`, MIT) and encode
  `https://www.kaazchacharitabletrust.com/people/<slug>`; a changed slug is kept in `aliases`
  so printed codes never break.
- **Local dev**: `vercel dev --listen 3210` (API) + `npx vite` (proxies `/api` to 3210).
- **Seed**: `node --env-file=.env.local scripts/seed-cms.mjs` (no-op if collections exist).
