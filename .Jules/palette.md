## 2024-03-31 - Improved Auth Form Accessibility and UX
**Learning:** Shared state across Radix UI `<Tabs>` components (e.g., login vs register) can bleed when switching tabs, causing confusion. Form inputs must also be explicit with `required` and `autoComplete` attributes for optimal browser native validation and assistive technology.
**Action:** Added `onValueChange` handler to the `<Tabs>` component to clear shared state when switching between login and register. Explicitly added `required` and `autoComplete` to all auth form fields along with a visual required indicator (`*`).
