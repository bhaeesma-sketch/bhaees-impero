## 2024-05-26 - Add ARIA Labels and Focus Styles to Header Buttons
**Learning:** Icon-only buttons (like menu, search, user dropdown, and theme toggles) in this app's header frequently lack both ARIA labels and clear focus indicators, which severely impairs accessibility for screen reader and keyboard users.
**Action:** When adding or maintaining icon-only buttons, consistently apply `aria-label` attributes and explicit `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to ensure full accessibility.
