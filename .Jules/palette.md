# Palette's Journal

This journal records critical UX and accessibility learnings.

## 2025-05-27 - [Initial Setup]
**Learning:** This project uses icon-only buttons extensively in the header and overlay components without `aria-label` attributes.
**Action:** When creating icon-only buttons, always include `aria-label` or `aria-labelledby` to ensure screen reader users can understand the button's purpose.
