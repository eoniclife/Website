# CODEX Notes — shareable protocol and admin link pass

Date: 2026-05-03

Context from the requested implementation:
- Added server-rendered protocol route at `app/protocol/[orderId]/page.tsx`
- Added shop confirmation share link block at `app/shop/page.tsx`
- Added admin order detail protocol link at `app/admin/pipeline/[orderId]/page.tsx`
- Added client copy utility `components/shop/ProtocolShareLink.tsx`

Schema checks against `supabase/schema.sql`:
- `orders` does **not** have direct `primary_module` or `secondary_module` columns; modules are stored in `orders.protocol_config`.
- `quiz_sessions` does **not** include `dimension_scores`; only `scores` (dimension totals), `raw_answers`, and module columns are stored.
- `orders.quiz_session_id` exists and can be used for a direct join to `quiz_sessions`.
- For user-based session fallback, `quiz_sessions` has `user_id` and `completed_at`, so we can query latest completed session by `user_id`.

Current checkout gaps relative to the brief:
- No `/app/admin/*` routes existed before this update, so admin detail behavior is now newly introduced here.
- `/app/api/order/reserve` and a full reservation-form flow are not present in this checkout, so `/shop` can only show the share link when `orders.status` is already `reserved` or `paid`.
- `CODEX_NOTES.md` did not exist in this workspace before this work; this file was created.

Update on this run (shareable protocol hardening):
- Confirmed actual schema in this workspace (`supabase/schema.sql`) still uses `orders.scores`/`protocol_config` pattern and does not expose:
  - `orders.primary_module` or `orders.secondary_module`
  - `quiz_sessions.dimension_scores`
- `orders.quiz_session_id` is present and is the preferred path for pulling quiz context.
- A fallback path by `quiz_sessions.user_id + completed_at DESC` remains valid.
- `app/protocol/[orderId]/page.tsx` now renders a server-side share view with `Nav`, `Footer`, module sections from resolved modules, and a guarded "Hidden dimensions" block from quiz `scores` when available; it intentionally avoids `EmailCapture` and preserves the existing quiz-offer CTA.
- `components/shop/ProtocolShareLink.tsx` now explicitly labels the shared URL as "Your protocol link" and exposes a copy action using plain `navigator.clipboard.writeText`.
- `app/admin/pipeline/[orderId]/page.tsx` already had the "View protocol page →" link and continues to open `/protocol/<orderId>` in a new tab; location remains near the order detail section.
