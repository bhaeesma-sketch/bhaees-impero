## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances of icon-only buttons (like menu, search, user dropdown triggers, and theme toggle) in the header and other components lacking `aria-label` attributes and explicit focus-visible rings for keyboard navigation accessibility.
**Action:** Always add descriptive `aria-label` attributes and `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to all icon-only interactive elements to ensure screen reader support and visible keyboard focus.
