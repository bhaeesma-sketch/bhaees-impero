## 2024-05-24 - Prevent Form State Bleeding in Shared Auth Components
**Learning:** Shared form state (like `username` and `password` variables) in Tab-based or Modal-based authentication components 'bleeds' when the user switches views or reopens modals, causing their previous inputs to unexpectedly persist. This creates a confusing and unpolished UX.
**Action:** Always implement `onValueChange` handlers on Tab components and close/toggle handlers on Modals to explicitly reset shared form states back to their defaults when switching contexts.
