## 2024-05-14 - [Adding accessible attributes to Header icon buttons]
**Learning:** Found multiple icon-only buttons in the main navigation Header (`client/src/components/layout/header.tsx`) lacking explicit `aria-label`s and proper keyboard focus states. Added `aria-label` and `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` class combinations to ensure accessibility.
**Action:** Always check icon-only buttons for missing labels and visible focus rings when exploring global layout components.
