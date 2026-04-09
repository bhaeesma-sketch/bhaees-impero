## 2024-04-09 - Radix UI Tabs Shared State Bleed
**Learning:** When using Radix UI `<Tabs>` for forms with shared state (e.g., Login/Register sharing `username`/`password` in `client/src/pages/auth.tsx`), state bleed occurs on tab switch. This forces users to manually clear inputs if they switch from login to register, a common friction point in auth flows.
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component to explicitly clear shared form state when toggling between tabbed forms.
