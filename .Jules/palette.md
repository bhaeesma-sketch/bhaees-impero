## 2024-05-19 - Added ARIA labels to icon-only buttons
**Learning:** Found that custom `<Button size="icon">` components used frequently for actions like Edit/Delete and close modals lacked accessible names, making them unreadable to screen readers.
**Action:** Always ensure that any button that visually relies purely on an icon (e.g., Lucide React icons) includes a descriptive `aria-label` attribute to provide context to assistive technologies.
