## 2024-06-22 - Header Icon Buttons
**Learning:** Icon-only buttons (like Search, User, Menu, Close) in the main navigation header were lacking `aria-label` attributes, making them opaque to screen reader users. The theme toggle button also needed a dynamic `aria-label` to communicate state.
**Action:** Always ensure icon-only buttons receive descriptive `aria-label` attributes, and that state-toggling buttons use dynamic labels corresponding to their current/next state.
