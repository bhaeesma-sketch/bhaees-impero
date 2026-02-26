## 2025-02-27 - Auth Form Separation
**Learning:** Shared state between Login/Register tabs causes data bleeding and confusion for password managers.
**Action:** Always use separate state variables for distinct forms in tabbed interfaces, even if they share field names. Add 'autoComplete' attributes to guide browsers and password managers.
