## 2024-05-24 - Missing ARIA Labels on Icon-only buttons
**Learning:** Found several icon-only buttons in the main navigation header (menu, search, user profile, close menu) lacking `aria-label` and explicit `focus-visible` states. This makes them inaccessible to screen readers and difficult to navigate via keyboard.
**Action:** Always add descriptive `aria-label` attributes and explicit `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to icon-only buttons.
