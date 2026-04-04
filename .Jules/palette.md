
## 2025-01-28 - Radix UI Tabs Shared State Bleed
**Learning:** When using Radix UI `<Tabs>` for forms with shared state (e.g., Login/Register sharing `username`/`password` in `client/src/pages/auth.tsx`), state bleed occurs on tab switch. The state from the previous tab populates the new tab's fields incorrectly.
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component to explicitly clear the shared state when switching tabs.
