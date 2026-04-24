
## 2024-04-24 - Add ARIA Labels and Focus States to Header Icon Buttons
**Learning:** Icon-only buttons (like menu, search, user dropdown) must have explicit `aria-label` attributes to be announced correctly by screen readers, and require proper `focus-visible` classes (like `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`) to ensure keyboard accessibility.
**Action:** Applied `aria-label` attributes and focus classes to the mobile menu open/close, search, and user dropdown buttons in the `Header` component. Next time creating or modifying icon-only buttons, ensure these accessibility attributes and focus styles are included by default.
