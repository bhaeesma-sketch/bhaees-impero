## 2024-06-09 - Accessible Icon Buttons in Impero Header
**Learning:** Found several icon-only buttons in the main navigation header (Mobile menu toggle, Search, User account, Close modal, Theme toggle) that lack `aria-label` attributes, making them inaccessible to screen reader users. The application also suffers from state-bleeding in shared tab components as noted in memory.
**Action:** Adding `aria-label` attributes to these icon-only buttons and ensuring dynamic descriptions for toggle buttons (like theme toggle).
