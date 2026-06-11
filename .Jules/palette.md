## 2024-05-30 - Added ARIA labels and Focus states to Header Icon Buttons
**Learning:** Header navigation controls (mobile menu, search, theme toggles) lacked descriptive ARIA labels and explicit focus states, making them difficult to use for screen reader users and keyboard-only users.
**Action:** Ensure all icon-only interactive elements in top-level navigational components explicitly provide `aria-label` (dynamic when stateful like a theme toggle) and use `focus-visible:ring-2` to support robust accessibility.
