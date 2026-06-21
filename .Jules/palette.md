## 2024-06-21 - Added Tooltips to Admin Action Buttons
**Learning:** Icon-only buttons (like Edit/Delete) on complex pages need explicit tooltips and accessible names. Even if hover states are clear to sighted users, screen readers require `aria-label` and general users benefit from tooltips explaining destructive or administrative actions.
**Action:** Always wrap icon-only action buttons in Radix Tooltips with explicitly defined `aria-label` and `focus-visible` states to ensure both visual and keyboard accessibility.
