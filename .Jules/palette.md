## 2024-06-11 - Explicit Focus States for Icon Buttons
**Learning:** Icon-only buttons lacking explicit `focus-visible` states make keyboard navigation difficult, as default browser focus rings are often insufficient or suppressed by global CSS resets. Relying purely on hover states excludes keyboard users.
**Action:** When adding `aria-label`s to icon-only buttons for screen readers, simultaneously ensure explicit keyboard visibility by appending `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`.
