## 2026-03-30 - Prevent State Bleed in Radix Tabs
**Learning:** When using Radix UI `<Tabs>` to switch between forms with shared state (like Login/Register sharing `username` and `password`), state bleeds over when switching tabs, leading to a confusing user experience.
**Action:** Add an `onValueChange` handler directly to the `<Tabs>` component to explicitly clear the shared state when the tab changes.
