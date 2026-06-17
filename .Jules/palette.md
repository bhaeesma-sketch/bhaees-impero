## 2024-06-17 - Missing ARIA Labels in Navigation Header
**Learning:** Icon-only buttons for mobile menu, search, user profile, and close mobile menu do not have `aria-label`s, making them inaccessible for screen reader users. Also missing `focus-visible` states for keyboard accessibility on some navigation links/buttons.
**Action:** Add descriptive `aria-label` and `focus-visible` Tailwind classes to all icon-only buttons to improve general accessibility.
