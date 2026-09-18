# Virginia Navigator

All build commands and file paths below are relative to the repository root.


Open `dist/Virginia-Navigator.html` directly in Chrome. No installation, server, login, or internet connection is needed. Upload that one file to Google Drive; students download it and open the downloaded file in Chrome. Drive preview is not the game player. Managed school devices may restrict local HTML; verify on a student device before distribution.

Four short cargo expeditions teach the James/Richmond, York/Yorktown, Rappahannock/Fredericksburg, and Potomac/Alexandria relationships. Students navigate connected river bends, follow upstream/downstream directions, and carry cargo around Richmond's Fall Line rapids. No trivia gates, timer, leaderboard, or failure penalty. Use mouse/touch on map markers, or Tab/arrow keys and Enter/Space. Zoom enlarges the map around the cargo. The field guide, optional hints, immediate feedback, and discovery notebook support learning.

### Build and verify

Requires Node.js 20+ for development only; no packages to install.

```sh
npm run build:virginia
node --test tests/model.test.mjs
```

The build deterministically embeds the content, map, CSS, and JavaScript into the release. Do not edit the release directly. On restricted hosts that block test subprocesses, Node 24 can use `node --test --test-isolation=none tests/model.test.mjs`.

### Structure and offline rules

- `games/virginia-navigator/content/`: versioned mission data and geographic coordinates, independent of UI.
- `games/virginia-navigator/src/model.js`: route rules and state; no DOM dependency.
- `games/virginia-navigator/src/game.js`: SVG renderer and input mapping; all inputs call the same model actions.
- `games/virginia-navigator/src/index.html` and `style.css`: accessible DOM interface and presentation.
- `tools/build-game.mjs`: single-file exporter. `dist/`: distributable HTML. `tests/`: model and export checks. `docs/`: sources and test evidence.

Future games should use their own `games/<slug>/src` and `content` directories, with a stable, versioned content schema. Keep subject matter out of renderer code where practical. Configure each exporter through its game.json manifest; share only proven common helpers. Add content-specific validation and learning-objective tests with each pack. Never load JSON through fetch in the release: embed it at build time.

Runtime rules: no CDN, remote font, API, analytics, external assets, module imports, service worker, or web-server requirement. Inline or embed every asset. Preserve the restrictive Content Security Policy; network connections are disabled. The current game stores progress only in memory and resets on reload, avoiding file-origin storage differences and student data collection.

The SVG/vanilla-JavaScript implementation is intentional: this geographic route game does not need a physics engine, and benefits from keyboard-focusable markers and a small dependency-free release.

### Scope and remaining work

This is a first playable release covering selected 2023 VS.1b/c geography concepts, not the whole Virginia Studies blueprint. It does not teach all five regions, bordering states, Lake Drummond, the Dismal Swamp, or Indigenous history. See `docs/SOURCES.md` for curriculum verification limits. Geography is generalized, with accurate relative locations and real city coordinates, not survey-grade river geometry. The map shows eastern Virginia only, river segments only, and an approximate Fall Line. Complete a teacher content review and a managed Chromebook/physical touch-device check before classroom rollout. No persistent progress or audio narration yet.



## Shared build manifest

The game.json manifest selects source files for the shared exporter. Run npm run build -- virginia-navigator (or npm run build:virginia) from the repository root. npm run test:virginia rebuilds and runs this game's model/export checks; npm run test:all rebuilds and tests both games. npm run test:browser:virginia runs optional offline Chrome integration (Playwright required). Both games' flat dist/ HTML files are intentionally committed. Browser evidence is written under ignored test-results/; existing documentation screenshots remain historical evidence. See [shared build guidance](../../shared/build/README.md) and [third-party licenses](../../THIRD_PARTY_LICENSES.md).
