## 2024-05-12 - Icon-only buttons lacking ARIA labels
**Learning:** The header component has several icon-only buttons (mobile menu, search, user dropdown trigger, mobile menu close) that lack `aria-label` attributes and focus-visible outlines. This is an accessibility issue for screen readers and keyboard navigation.
**Action:** Always verify icon-only buttons have descriptive `aria-label` attributes and explicit `focus-visible` styles like `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
