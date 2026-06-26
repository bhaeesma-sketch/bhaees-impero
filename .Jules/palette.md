## 2024-06-26 - [Playwright Keyboard Verification in Radix/Tailwind]
**Learning:** When visually verifying keyboard accessibility (`focus-visible`) for Radix components styled with Tailwind, programmatic `Tab` sequence simulation is brittle. Dynamically extracting and executing the locator's `focus()` method via Playwright provides a much more robust verification of explicit focus rings.
**Action:** When creating frontend verification scripts for focus states, programmatically trigger focus directly on the target element rather than relying on sequential Tab keypresses to prevent flaky tests.
