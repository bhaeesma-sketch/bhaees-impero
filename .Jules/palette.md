# Palette Journal

## 2025-02-19 - Added Aria-Labels to Header
**Learning:** Icon-only buttons in the main navigation header (e.g., search, user menu, theme toggle, mobile menu toggle) lacked `aria-label` attributes. This is a common accessibility issue where screen readers cannot interpret the action of a button without text.
**Action:** Added `aria-label`s to all icon-only buttons in the `Header` component. Going forward, ensure any new icon-only interactive elements introduced include descriptive `aria-label` attributes to maintain accessibility standards.
