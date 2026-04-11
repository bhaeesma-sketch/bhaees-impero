## 2026-04-11 - Prevent State Bleed in Shared Forms within Tabs
**Learning:** When using Radix UI `<Tabs>` for forms that share state (e.g., Login/Register sharing `username`/`password` in `client/src/pages/auth.tsx`), state bleed occurs on tab switch. This leaks user input between the views, which is confusing and poor UX.
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component to explicitly clear the shared state. This pattern should also be applied to custom toggle buttons (e.g., in `client/src/components/auth/AuthModal.tsx`).
