## 2024-05-01 - Icon-only buttons lack ARIA labels and explicit focus states
**Learning:** Custom icon-only navigation buttons in the application lack explicit ARIA labels and keyboard focus outlines, severely impacting screen reader and keyboard accessibility.
**Action:** Added `aria-label` attributes and explicit `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` utility classes to all icon-only buttons (Menu, Search, User, Close Menu, Theme Toggle).
