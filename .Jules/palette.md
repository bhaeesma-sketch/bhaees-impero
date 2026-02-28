# Palette's UX Journal

## 2025-02-28 - Added ARIA labels to Header buttons
**Learning:** Found several icon-only buttons in the main navigation header (Mobile Menu, Search, User, Theme Toggle) that lacked accessible names. Without these, screen reader users would just hear "button" without context, making navigation impossible.
**Action:** Added descriptive `aria-label` attributes to all icon-only buttons in `client/src/components/layout/header.tsx` to ensure proper screen reader announcements.
