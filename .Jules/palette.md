## 2026-05-07 - Hover-Revealed Element Accessibility
**Learning:** The application uses CSS transform/translation combined with hover states (`group-hover:translate-y-0`) for revealing interactive elements like quick action buttons. These are inaccessible to keyboard users unless explicitly handled.
**Action:** Always ensure that parent containers of such elements include `focus-within:translate-y-0 focus-within:opacity-100` and that the interactive children have explicit `focus-visible` styles so they can be navigated to and become visible via keyboard.

## 2026-05-07 - Radio Button Groups Accessibility
**Learning:** Selection button groups (like weight options) acting as radio buttons need proper ARIA roles to be understood by screen readers, and abbreviations (like 'g' for grams) are read literally which can be confusing.
**Action:** Wrap such groups in `role="group"` with a descriptive `aria-label`, use `aria-pressed` on the individual buttons, and provide expanded abbreviations in `aria-label` (e.g., "10 grams" instead of "10g").
