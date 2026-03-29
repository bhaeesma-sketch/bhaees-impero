## 2024-05-18 - Radix UI Tabs Shared State Bleed
**Learning:** When using Radix UI `<Tabs>` for forms with shared state (e.g., Login/Register sharing `username`/`password`), state bleed occurs on tab switch, causing confusion.
**Action:** Always add an `onValueChange` handler to the `<Tabs>` component to explicitly clear shared state when navigating between tabs.
