## 2025-02-12 - Dynamic ARIA labels for Theme Toggle Button
**Learning:** Using a single static ARIA label on a state-toggling element (like a theme button) fails to communicate the action that will occur upon activation.
**Action:** Implemented dynamic `aria-label` based on the current component state (`theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'`) to improve clarity for screen reader users. Also ensured all interactive elements receive robust keyboard focus states (`focus-visible:ring-2`).
