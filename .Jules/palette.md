## 2025-05-15 - Icon-Only Button Accessibility
**Learning:** Found several top-level navigation and modal toggle buttons in the application (`client/src/components/layout/header.tsx`) lacking proper aria-labels and specific focus states, presenting an accessibility constraint for keyboard navigation and screen readers.
**Action:** Added specific `aria-label` tags describing the button function and explicit `focus-visible` classes (like `focus-visible:ring-primary focus-visible:outline-none`) to all icon-only action buttons.
