
## 2026-04-16 - Prevent Shared State Bleed in Tabbed Authentication Forms
**Learning:** When using Radix UI `<Tabs>` or custom toggle buttons (like in `AuthModal`) to switch between login and register views that share input state variables (`username` and `password`), the entered text "bleeds" across views. This creates a confusing UX and potential security/privacy issue if a user decides to switch context mid-entry.
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component or the toggle button's `onClick` handler to explicitly clear the shared state variables when the view changes. Also remember to add appropriate `autoComplete` attributes to support password managers natively across these toggled views.
