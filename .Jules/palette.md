## 2025-02-14 - Improve Header Keyboard Accessibility
**Learning:** Icon-only buttons in navigation headers often lack clear focus indicators (`focus-visible`) and `aria-label` attributes, making them difficult to use for keyboard navigators and screen readers.
**Action:** Always add explicit `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` and descriptive `aria-label`s to custom icon-only buttons (e.g., search, menu, theme toggles, close buttons).
