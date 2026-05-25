
## 2024-05-25 - Icon-Only Button Accessibility Pattern
**Learning:** Found a recurring pattern in the design system where custom icon-only interactive elements (like the theme toggle, mobile menu, search, and close buttons) lack accessible names for screen readers and visible focus indicators for keyboard navigation.
**Action:** When building or modifying custom interactive components and icon-only buttons, consistently apply `aria-label` attributes and explicit focus classes (e.g., `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`) to ensure robust accessibility.
