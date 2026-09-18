# Verification

Tested in installed desktop Chrome using an isolated Playwright context with `offline: true`, loading the actual release via `file:///`. No local server was used.

- Four model/export tests pass: every mission completes, invalid jumps and river changes are rejected, the James rapids require carrying, early carrying is rejected, and export has no external runtime references.
- Mouse completion of all four routes, keyboard arrow/Enter movement, incorrect-river feedback, Fall Line blocking/carrying, completion screen, and replay pass.
- Touch emulation at 390 × 844 successfully moves cargo; no horizontal page overflow.
- No browser JavaScript errors and no HTTP/HTTPS requests during the offline desktop session.
- Screenshots: `desktop.png`, `mobile.png`, `completion.png`.

The initial browser test found overlapping hit targets at Richmond. Target radii now respect adjacent marker distance. Zoom is provided for closely spaced markers on small screens.

Limits: touch is emulated, not tested on a physical tablet; no managed Chromebook, screen-reader, or classroom playtest yet. Whole-map labels are intentionally small on phones; use Zoom. Reload starts a fresh expedition.

## Current repeatable commands

Run npm run test:virginia for model/export checks and npm run test:browser:virginia for offline Chrome keyboard/touch completion of all four routes. The release is dist/Virginia-Navigator.html. Set PLAYWRIGHT_MODULE and CHROME_PATH when using existing local installations.
