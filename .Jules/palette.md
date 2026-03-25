## UX/Accessibility Learnings
## 2025-03-25 - ARIA Labels for Icon-Only Header Buttons
**Learning:** Icon-only buttons (mobile menu, search, user dropdown, close menu, and theme toggle) in `client/src/components/layout/header.tsx` lacked `aria-label`s, which reduced accessibility for screen readers. Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` utility classes to support keyboard navigation.
**Action:** When creating icon-only interactive elements like buttons, always ensure an `aria-label` is included, and apply the standard keyboard accessibility focus utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`).
