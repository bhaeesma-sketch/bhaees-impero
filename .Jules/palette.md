## 2024-05-25 - Icon Button Accessibility
**Learning:** Icon-only buttons (like search, menu, and user account toggles) often miss critical accessibility context, making them opaque to screen readers. Relying solely on hover states for discovery is insufficient.
**Action:** Always add descriptive `aria-label`s to standalone icon buttons and ensure clear `focus-visible` styling (e.g., `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`) to support robust keyboard navigation.
