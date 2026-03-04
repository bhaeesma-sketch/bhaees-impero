## 2026-03-04 - Added ARIA labels to header icon buttons
**Learning:** Found several icon-only buttons in the main header (Menu, Search, User dropdown, Close menu) missing `aria-label`s. Since the header is a critical and globally present navigation component, these missing labels severely impacted screen-reader accessibility for primary navigation features.
**Action:** When working on navigation or header components, explicitly check for and add `aria-label` attributes to all icon-only interactive elements to ensure screen-reader users can access all major application pathways.
