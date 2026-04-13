## 2024-05-24 - Form Input Auto-Complete & State Management
**Learning:** Shared state between login/register forms without proper value reset on toggle causes state bleed, confusing users who see partially filled passwords when switching modes. Missing `autoComplete` attributes on password/username fields breaks password managers.
**Action:** Always add `onValueChange` to form Tabs or custom toggles to reset shared state. Explicitly set `autoComplete="username"` and `autoComplete="current-password"` (or `new-password`) on authentication fields.
