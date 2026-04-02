## 2026-04-02 - State Bleed in Shared Form Components
**Learning:** When using Radix UI Tabs for forms with shared state (like Login/Register sharing username/password state), state bleed occurs on tab switch.
**Action:** Always add an onValueChange handler to the Tabs component to explicitly clear the shared state when navigating between modes.
