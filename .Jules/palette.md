## 2024-05-23 - Add ARIA Labels to Header Action Buttons
**Learning:** Icon-only buttons in the application header lack `aria-label` attributes, which significantly limits their accessibility for screen reader users. The navigation buttons for "Open Menu", "Search", "User Account/Log In", and "Close Menu" are currently only visually identifiable.
**Action:** Next time, always ensure `aria-label` or `title` attributes are applied to interactive icon elements, especially those placed globally in layouts such as headers or footers, as they are crucial for a fully accessible core navigation flow.
