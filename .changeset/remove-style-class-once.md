---
"babel-plugin-jsx-dom-expressions": patch
"dom-expressions": patch
---

Remove the `style:foo`, `class:foo`, and `@once` features from JSX. `style:foo` and `class:foo` no longer get special handling — they fall through to literal HTML attributes (e.g. `<div style:border="1px solid black">` emits `style:border` verbatim). The `@once` comment marker is now ignored, so previously-skipped values are wrapped in effects like any other dynamic.

Internal optimizations still split `style={{...}}` into `setStyleProperty` calls and `class={{...}}` into `classList.toggle` calls.
