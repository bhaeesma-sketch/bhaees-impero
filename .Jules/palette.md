## 2024-11-20 - Radix UI Shared State Bleeding
**Learning:** When building auth forms using Radix UI `<Tabs>` (e.g., Login/Register forms) or `<Dialog>` (modals) with a shared React state for form inputs, the state bleeds between tabs or between open/close cycles of the modal.
**Action:** Always attach an `onValueChange` handler on `<Tabs>` and an `onOpenChange` handler on `<Dialog>` to explicitly reset shared form state variables. Apply this pattern consistently across all components that reuse state variables for different internal views.
