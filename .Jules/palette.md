## 2026-05-13 - State Bleeding in Auth Forms
**Learning:** Radix UI <Tabs> and custom toggle buttons can cause state bleeding (e.g., shared username/password) when switching modes or closing/re-opening modals.
**Action:** Always add an `onValueChange` or `onClick` handler to explicitly clear shared state during mode switching, and clear state when a modal is closed.
