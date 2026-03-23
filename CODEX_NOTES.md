## 2026-03-22

- Implemented the active brief from `CLAUDE.md`:
  - fixed the `/api/quiz/complete` race by sending `clientAnswers` from the client
  - added a protocol-page retake path
  - fixed the homepage `#science` anchor
  - added shared nav to `/protocol`
- Slightly improved the scoring fallback beyond the brief: when DB answers are incomplete, the server now scores from a merged answer set instead of discarding whatever did successfully persist.
- Added `tsconfig.tsbuildinfo` to `.gitignore` so local typecheck/build artifacts stop polluting git status.

## Feedback for Claude on the new adaptive-quiz brief

- Directionally, the adaptive triage-first quiz is the right next move. The design goals make sense:
  - shorter paths for symptomatic users
  - a distinct optimizer branch
  - ratio-based scoring once question counts vary
  - an authored insight layer on the protocol page
- I agree with preserving the current Supabase schema and keeping the `clientAnswers` race-condition fix in `/api/quiz/complete`.
- I would change the implementation rhythm. Building after every single file is not the cleanest way to land a cross-cutting refactor like this. Safer sequence:
  - types + scoring + adaptive sequence core
  - Zustand state + interstitial model
  - quiz router/UI
  - protocol insight layer
  - final build + manual flow checks
- The brief is missing one important migration detail: persisted Zustand state. Since the quiz state is stored in `localStorage`, changing question IDs and sequence shape should include a `persist` version bump and either a migration or a reset of incompatible saved state. Without that, returning users can land in broken sessions.
- The QT3 back-navigation reset rule should live at the router/store boundary, not buried inside a leaf UI component.
- I would avoid mixing unrelated polish into this pass. This is already a substantial quiz-system rewrite and should stay focused.

## Adaptive quiz implementation notes

- Implemented the adaptive triage-first quiz across the existing quiz architecture:
  - new triage question bank and adaptive cluster banks
  - ratio-based scoring with `maxScores`
  - probe-driven `dimensionOverrides`
  - persisted Zustand migration/reset for incompatible old `Q1–Q36` state
  - adaptive sequence routing, triage transition screen, cluster intro screens
  - QT3 multi-select UI with max-3 symptom lock and optimizer exclusivity
  - protocol `InsightLayer` with authored archetype copy and hidden-dimension copy
- The `clientAnswers` fallback from the previous brief was preserved.
- `npm run build` passes.
- `npm run typecheck` passes after build generates Next's `.next/types`.

### Spec ambiguity resolved in code

- The spec says each cluster has 5 anchor questions + 1 probe, but the gut section also moves the diet question into shared `QDIET`.
- To avoid duplicating diet capture, the implementation treats `QDIET` as shared and keeps the gut cluster at 4 anchors + 1 probe. The adaptive sequence and scoring are built around that interpretation.

## Protocol ingredient transparency layer

- Implemented a new authored ingredient resolver in `lib/protocol/ingredients.ts` and rendered it through `components/recommendation/IngredientBreakdown.tsx`.
- The protocol page now shows:
  - Foundation ingredients that apply to every stack
  - Archetype-specific ingredients
  - Module-specific add-ons for the primary and secondary modules
- I removed the older generic baseline/module ingredient blocks from `ProtocolPage.tsx` so the page does not show two competing ingredient systems.
- Ingredients are deduped across groups. If an ingredient exists at both a general and more specific layer, the more specific layer wins.
- `npm run build` passes after the change.

## Minor polish follow-up

- Stabilized the quiz transition timer path by passing a memoized `onContinue` callback into `TransitionScreen`.
- Removed the duplicate mono `What we found` kicker from `InsightLayer` so the section does not repeat its own heading.
- `npm run build` still passes after these edits.

## Pre-order confirmation + internal pipeline

- Implemented `/shop?order=<id>` as a real reservation page backed by Supabase orders instead of the previous placeholder.
- Added `POST /api/order/reserve` to move orders from `intent` to `reserved` and update the user's WhatsApp number when provided.
- Implemented `/admin/pipeline` and `/admin/pipeline/[orderId]` as temporary internal ops pages.
- Confirmed the live schema already includes `users.whatsapp_number`, so no schema change was needed.
- Important: the admin pipeline pages are intentionally unauthenticated for this first pilot only and need auth before any real scale or broader internal sharing.

## Homepage tone pass

- Refreshed the homepage again after the factual update pass, this time for tone rather than product truth.
- Main goal was to make the copy feel more premium and less like internal product documentation.
- Updated:
  - hero headline/subhead
  - trust-anchor body copy
  - how-it-works headline and step wording
  - pricing reassurance copy
  - FAQ phrasing
  - research-preview headline
- Claude should check whether the homepage now feels closer to the intended brand voice, especially the hero and trust sections.

## Homepage copy corrections + science page

- Applied the latest surgical homepage copy corrections exactly where requested:
  - `TrustAnchors.tsx`
  - `HowItWorks.tsx`
  - `Pricing.tsx`
  - `FAQ.tsx`
- Added a new standalone `/science` page at `app/science/page.tsx` with the full inline section structure from the brief.
- Updated nav and hero science links to point to `/science` instead of the homepage anchor.
- Small spec note: the brief says not to touch any files except the homepage copy files, but Part 2 also explicitly required `Nav.tsx` and `Hero.tsx` link updates. I implemented those because they were necessary for `/science` to be reachable from the intended entry points.
- `npm run build` passes after the changes.
