# Palette UX Journal

## 2024-06-02 - Added Focus Visible States and ARIA Labels to Header Interactive Elements
**Learning:** Found that multiple icon-only interactive buttons in the navigation header (search, mobile menu, close menu, user account, and theme toggler) lacked ARIA labels and distinct keyboard focus styles. The missing `focus-visible` classes made keyboard navigation opaque for users, while missing `aria-label` tags decreased screen reader accessibility.
**Action:** Applied `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` and appropriate `aria-label` attributes to these custom interactive elements (e.g. `<button>`). Ensure any future interactive elements added to the global navigation structure receive these attributes by default for improved overall accessibility.
