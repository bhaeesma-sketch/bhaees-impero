## 2024-05-30 - Auth Form Tab State Bleeding
**Learning:** When using Radix UI `<Tabs>` for forms with shared state (e.g., Login/Register sharing `username`/`password`), state bleed occurs when the user switches tabs, posing a confusing experience and potential security risk (leaking password lengths/content between modes).
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component to explicitly clear shared authentication state when toggling between contexts.
