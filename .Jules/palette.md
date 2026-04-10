## 2025-04-10 - Add ARIA Labels to Header Actions
**Learning:** Found several icon-only buttons (Search, Theme Toggle, Mobile Menu, User Account) in `client/src/components/layout/header.tsx` lacking `aria-label` attributes. This is a common pattern in the app's components, which makes the UI inaccessible to screen readers as they won't know the purpose of the buttons.
**Action:** Consistently verify all buttons that rely entirely on icons (or are predominantly visually driven without text content) include descriptive `aria-label` attributes for screen readers.
