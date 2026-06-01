## 2024-05-19 - ARIA Labels & Focus Styles on Header Interactive Elements
**Learning:** Icon-only buttons (like Menu, Search, My Account, Theme Toggle) lack descriptive ARIA labels, rendering them inaccessible to screen readers. Further, they do not have clear focus indicators.
**Action:** Always verify that interactive elements, especially icon-only buttons, possess descriptive `aria-label`s or visually hidden text, and explicit `focus-visible` classes (like `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
