## 2024-05-24 - Missing Focus and ARIA on Nav Icons
**Learning:** Icon-only interactive elements in the main navigation bar (like mobile menu toggles, search, and user account buttons) frequently omit critical `aria-label` attributes for screen readers and lack explicit `focus-visible` states, making keyboard navigation difficult and inaccessible.
**Action:** Always ensure icon-only buttons include descriptive `aria-label`s and establish a consistent keyboard focus pattern using `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
