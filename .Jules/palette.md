## 2025-02-14 - Header Icon Button Accessibility
**Learning:** Icon-only interactive elements in the main navigation (e.g., mobile menu, search, user dropdown) were missing `aria-label`s and clear `focus-visible` styles, relying heavily on color changes and mouse hovers, which hindered screen reader and keyboard accessibility.
**Action:** When adding or updating icon-only interactive components, explicitly set an `aria-label` and use Tailwind's `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to ensure visible focus indicators and accessible names.
