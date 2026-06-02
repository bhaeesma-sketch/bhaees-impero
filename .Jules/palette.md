
## 2024-05-18 - Missing ARIA labels and focus indicators in layout components
**Learning:** Found several icon-only buttons in `client/src/components/layout/header.tsx` lacking `aria-label`s and proper `focus-visible` styling (Search, User menu, Mobile Menu toggle/close, Theme toggle). Interactive elements without text must provide an accessible name for screen readers, and clear focus styling is critical for keyboard accessibility.
**Action:** Always add descriptive `aria-label`s to icon-only buttons. Add `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to these elements to ensure clear keyboard navigation focus states. Ensure dynamic labels (like theme toggle) represent the state appropriately.
