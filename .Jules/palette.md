## 2024-05-20 - Ensure Accessible Icon Buttons
**Learning:** Icon-only interactive elements in navigation and modals often miss essential aria-labels, and explicit focus-visible utility classes must be explicitly added to ensure robust keyboard navigation support across browsers without relying solely on default browser outlines.
**Action:** Always verify that icon-only buttons (`<button><Icon/></button>`) have an explicit `aria-label` and `focus-visible` classes (e.g., `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
