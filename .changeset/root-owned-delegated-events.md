---
"dom-expressions": patch
"hyper-dom-expressions": patch
"lit-dom-expressions": patch
---

Delegated events are now owned by render roots instead of the document by default. `render()` installs and disposes its delegated listeners with the root, `delegateEvents()` now only declares event demand, and additional listener containers can be registered explicitly for framework features that render outside the root.
