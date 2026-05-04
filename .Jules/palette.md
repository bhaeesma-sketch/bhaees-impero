## 2024-05-04 - Explicit Focus Styles on Interactive Components
**Learning:** In this application, standard utility components and icon-only buttons often lack default focus indicators that are visible enough for robust keyboard navigation, or they rely only on hover states.
**Action:** Always add explicit focus-visible classes like `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` alongside `aria-label` attributes to custom toggle buttons and icon-only interactive elements to ensure clear keyboard accessibility and screen reader support.
