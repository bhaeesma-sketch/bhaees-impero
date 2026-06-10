## 2024-06-10 - Header Icon Buttons Keyboard Accessibility
**Learning:** Icon-only buttons in the main navigation header (like the mobile menu trigger, search, and user account) frequently miss explicit ARIA labels and distinct keyboard focus states, making navigation difficult for screen reader and keyboard-only users.
**Action:** Applied comprehensive ARIA labels and standardized focus-visible Tailwind utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) to all header icon buttons to guarantee clear accessibility and interaction clarity.
