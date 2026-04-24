## 2024-04-24 - Accessibility for Icon-only Navigation Elements
**Learning:** Custom interactive elements or icon-only buttons (like mobile menu toggles, search actions, and user menus) require explicitly set `aria-label`s and visible focus states (`focus-visible` classes in Tailwind) to ensure keyboard accessibility and screen reader support.
**Action:** Always add descriptive `aria-label` attributes and include `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` classes to icon-only interactive elements and toggles to improve the navigation UX.
