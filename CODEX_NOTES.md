## 2026-03-22

- Implemented the active brief from `CLAUDE.md`:
  - fixed the `/api/quiz/complete` race by sending `clientAnswers` from the client
  - added a protocol-page retake path
  - fixed the homepage `#science` anchor
  - added shared nav to `/protocol`
- Slightly improved the scoring fallback beyond the brief: when DB answers are incomplete, the server now scores from a merged answer set instead of discarding whatever did successfully persist.
- Added `tsconfig.tsbuildinfo` to `.gitignore` so local typecheck/build artifacts stop polluting git status.
