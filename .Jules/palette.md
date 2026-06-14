## 2025-02-08 - Dynamic ARIA Labels for State Toggles
**Learning:** Using static ARIA labels on state-toggling elements (like a theme switch) fails to inform screen reader users of the action that will occur upon activation.
**Action:** Always use dynamic `aria-label`s that describe the resulting action based on the current state (e.g., `theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'`).
