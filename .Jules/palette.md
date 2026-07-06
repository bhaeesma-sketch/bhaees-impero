## 2024-03-20 - Header Accessibility
**Learning:** Found multiple icon-only buttons in the main header lacking ARIA labels, making them inaccessible to screen readers. Navigation links and icon buttons also lacked clear visible focus states for keyboard navigation.
**Action:** Always add `aria-label` to icon-only buttons (`Menu`, `Search`, `User`, `Close`, `Theme Toggle`). Apply Tailwind's `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` pattern to all interactive elements to ensure robust keyboard accessibility without affecting mouse users.
