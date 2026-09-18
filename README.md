# CCPS HSS Arcade

A growing collection of standalone history and social studies browser games. Each game has its own source, content, documentation, and downloadable HTML release.

## Game catalog

| Game | Experience | Guide | Standalone HTML |
| --- | --- | --- | --- |
| River Expedition: James River | A pixel-art river adventure with hazards, landings, field notes, and questions. | [Game guide](games/river-expedition/README.md) | [Game file](dist/River-Expedition-James-River.html) |
| Virginia Navigator | Short cargo missions exploring Virginia river-and-city relationships. Preserved original prototype. | [Game guide](games/virginia-navigator/README.md) | [Game file](dist/Virginia-Navigator.html) |

## River Expedition: James River

A four-stop adventure with continuous steering, randomized obstacles, automatic docking, collectible hearts, a journal, and a geographic reference map. Each landing includes five docking questions, a Field Note, and five camp questions.

- Source and content: [games/river-expedition](games/river-expedition/)
- Build: `npm run build:river`
- Test: `npm run test:river`
- [Architecture](games/river-expedition/ARCHITECTURE.md) · [Curriculum](games/river-expedition/docs/CURRICULUM.md) · [Map sources](games/river-expedition/docs/MAP-0.11.md)

## Virginia Navigator

The original map-navigation prototype covers the James/Richmond, York/Yorktown, Rappahannock/Fredericksburg, and Potomac/Alexandria relationships. It remains a separate game with its own release.

- Source and content: [games/virginia-navigator](games/virginia-navigator/)
- Build: `npm run build:virginia`
- Test: `npm test`
- [Sources](docs/SOURCES.md) · [Test notes](docs/TESTING.md)

## Playing and sharing

Download a game's HTML file, then open it locally in Chrome. Each release runs without internet, installation, or login. Google Drive can distribute the file; students download it rather than play inside Drive preview. Check local-file support on managed student devices.

## Adding future games

Create a separate `games/<game-name>/` folder containing its README, source, content, and any assets. Add a game.json manifest and a uniquely named standalone HTML release in root dist/, then add it to the catalog above. Preserve existing games when adding new ones. Node.js 20+ is needed only for development; builds and model tests require no package installation.

All releases must embed their scripts, styles, content, fonts, and assets. No runtime APIs, CDNs, analytics, remote assets, or server requirement. Keep editable source separate from generated releases and rebuild rather than editing exported HTML. Share helpers only when multiple games actually need them.

## Build and verify all games

Use Node.js 20+. Builds and model tests have no package dependencies.

```sh
npm run build:all
npm run build -- virginia-navigator
npm run build -- river-expedition
npm run test:all
npm run test:virginia
npm run test:river
```

Named build aliases are build:virginia and build:river. npm test runs test:all. Each game's game.json configures the shared exporter; see [manifest guidance](shared/build/README.md). Root dist/ contains flat, intentionally committed offline HTML files. Rebuild and commit them alongside source changes. Legacy build scripts remain compatibility wrappers.

Optional offline Chrome integration: npm run test:browser:river and npm run test:browser:virginia. Set PLAYWRIGHT_MODULE and CHROME_PATH for locally installed test tools. Browser evidence goes to ignored test-results/.

## Sources of truth

- **Repository = implementation source of truth:** executable code, versioned content, manifests, tests, and generated releases.
- **[CCPS HSS Arcade Creation Bible](https://docs.google.com/document/d/1c6WSysjjvw4ErLCb2MpoJmXL1Lv4NIzPEe95_hJt3bQ/edit?usp=drivesdk) = design/instructional source of truth:** intended learning experience and design principles.
- **2023 Virginia HSS SOL = curriculum/content source of truth:** authoritative standards govern factual and curricular alignment; design guidance cannot override them.

Resolve discrepancies against the authority for that domain and update implementation/design documentation together. Existing curriculum-review limitations remain documented in each game's sources.

## Sharing code and licensing

Follow **second use proves the abstraction**; see [shared/](shared/README.md). Only common build/offline checks are extracted; game engines and behavior remain independent.

Project-authored work uses [MIT](LICENSE). See [third-party inventory](THIRD_PARTY_LICENSES.md) for embedded map data and the unresolved PublicaMundi boundary-data license. The project's MIT license does not relicense third-party material.
