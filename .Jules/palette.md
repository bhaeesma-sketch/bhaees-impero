## 2024-06-16 - Dynamic ARIA labels for Theme Toggles
**Learning:** For state-toggling UI elements like theme buttons, static `aria-label`s are less helpful than dynamic ones that clearly describe the *resulting action* based on the current state.
**Action:** When adding `aria-label`s to toggle buttons (e.g., theme toggles), use a dynamic label that describes the action that will occur when clicked (e.g., `theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'`) instead of a generic label like 'Toggle theme'.
