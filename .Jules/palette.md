## 2024-05-25 - Prevent shared state bleed across auth tabs
**Learning:** When using components like Radix UI `<Tabs>` or modals with toggle buttons for forms with shared state (e.g. Login vs. Register sharing username/password fields), the state bleeds over when switching views. This leads to confusing UX where a user typing a login password sees it remain when switching to register.
**Action:** Always explicitly attach an `onValueChange` handler on `<Tabs>` and a state-reset callback on modal toggles/close functions to clear the shared input state.
