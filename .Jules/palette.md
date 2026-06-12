## 2025-02-09 - Accessible Header Buttons
**Learning:** Icon-only buttons in the navigation header require explicit `aria-label` attributes for screen readers to convey their purpose, and explicit focus states (e.g., `focus-visible:ring-2 focus-visible:ring-primary`) are necessary for keyboard navigation.
**Action:** Always ensure that icon-only interactive elements have semantic labels and visible focus indicators to maintain an accessible interface. For the theme toggle, the `aria-label` should dynamically reflect the action that will happen when clicked.
