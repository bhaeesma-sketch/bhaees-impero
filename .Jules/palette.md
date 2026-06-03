## 2024-05-18 - Header accessibility

**Learning:** Interactive components such as icon-only buttons need to provide aria-labels in addition to consistent `focus-visible` highlighting. In particular, custom theme toggles should provide dynamic labels. Also, Radix UI `<DropdownMenuTrigger>` handles keyboard events but custom triggers must still maintain visual focus state when focused (via `focus-visible`). The application is heavily using Tailwind classes to manage styles.

**Action:** Consistently apply `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none` across interactive components like buttons and link tags for visual focus. Provide dynamic `aria-label` for theme toggles to indicate the state change explicitly.
