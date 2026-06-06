## 2024-06-06 - Modal State Bleeding
**Learning:** When modals containing forms use shared state (like Login/Register in AuthModal), switching tabs or closing/reopening the modal can cause the entered data (like passwords) to unexpectedly bleed into the new state if not explicitly cleared.
**Action:** Always add state clearing logic to modal `onOpenChange` handlers (when closing) and to any internal tab/toggle switchers.
