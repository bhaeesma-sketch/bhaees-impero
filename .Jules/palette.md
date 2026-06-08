## 2025-02-23 - Dynamic ARIA labels for state-toggling buttons
**Learning:** For state-toggling buttons like theme switchers, screen readers need to know what action will occur, not just the current state.
**Action:** Use a dynamic `aria-label` that clearly describes the resulting action (e.g., `theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'`) to improve clarity.
