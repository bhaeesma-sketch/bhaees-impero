## 2024-05-20 - Icon Button Accessibility
**Learning:** Icon-only navigation buttons in the header lack inherent text for screen readers and often miss clear keyboard focus indicators, making them inaccessible to keyboard and assistive tech users.
**Action:** Always add descriptive `aria-label` attributes and explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` classes to all icon-only interactive elements.
