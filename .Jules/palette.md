# Palette's Journal

## 2024-03-24 - Shared State Bleed on Auth Tabs
**Learning:** When using Radix UI `<Tabs>` for forms with shared state (e.g., Login/Register sharing `username`/`password` in `client/src/pages/auth.tsx`), state bleed occurs on tab switch, causing a poor user experience as partially entered data for login might mistakenly be submitted for registration.
**Action:** Add an `onValueChange` handler to the `<Tabs>` component to explicitly clear the shared state (`username` and `password`) when switching between Login and Register tabs. This ensures a clean slate.