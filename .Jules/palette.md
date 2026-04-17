
## 2024-04-17 - Auth Form Shared State Bleed & AutoComplete
**Learning:** When using shared state (e.g. `username` and `password`) across different tabs or toggle states in an auth form (like switching between Login and Register), state bleed occurs where the user's input inadvertently carries over. Also, missing `autoComplete` attributes can impair password managers and accessibility.
**Action:** Always add an `onValueChange` handler to Radix `<Tabs>` or equivalent toggle methods to explicitly clear shared state, and ensure all auth inputs have appropriate `autoComplete` attributes (e.g., `username`, `current-password`, `new-password`) to enhance both accessibility and UX.
