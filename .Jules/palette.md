## 2024-05-18 - Added Accessibility to Icon-Only Buttons
**Learning:** Found several icon-only buttons (like the menu toggle, search, and user account) that lacked ARIA labels and explicit focus states, making them difficult to use for screen reader and keyboard users. Additionally, the theme toggle was missing an accessible name reflecting its current state.
**Action:** Added `aria-label` attributes to icon-only buttons, implemented dynamic ARIA labels for the theme toggle based on state, and applied Tailwind's `focus-visible` classes to ensure visible focus indicators.
