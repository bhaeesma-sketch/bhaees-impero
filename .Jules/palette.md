## 2024-05-16 - ARIA Labels on Utility Buttons and Image Carousels
**Learning:** Found a pattern of missing `aria-label` attributes on icon-only buttons like the mobile menu toggle, search button, theme toggle, and image thumbnails in product galleries. These are visually clean but completely inaccessible to screen readers without descriptive labels.
**Action:** Ensure that all icon-only buttons across components, including those within map iterations (like carousels or image galleries), receive appropriate and descriptive `aria-label` attributes to maintain accessibility standards.
