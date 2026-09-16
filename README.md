# CCPS HSS Arcade

A growing collection of standalone history and social studies browser games. Each game has its own source, content, documentation, and downloadable HTML release.

## Game catalog

| Game | Experience | Guide | Standalone HTML |
| --- | --- | --- | --- |
| River Expedition: James River | A pixel-art river adventure with hazards, landings, field notes, and questions. | [Game guide](games/river-expedition/README.md) | [Game file](dist/River-Expedition-James-River.html) |
| Virginia Navigator | Short cargo missions exploring Virginia river-and-city relationships. Preserved original prototype. | [Game guide](games/virginia-navigator/README.md) | [Game file](releases/Virginia-Navigator.html) |

## River Expedition: James River

A four-stop adventure with continuous steering, randomized obstacles, automatic docking, collectible hearts, a journal, and a geographic reference map. Each landing includes five docking questions, a Field Note, and five camp questions.

- Source and content: [games/river-expedition](games/river-expedition/)
- Build: `npm run build:river`
- Test: `npm run test:river`
- [Architecture](games/river-expedition/ARCHITECTURE.md) · [Curriculum](games/river-expedition/docs/CURRICULUM.md) · [Map sources](games/river-expedition/docs/MAP-0.11.md)

## Virginia Navigator

The original map-navigation prototype covers the James/Richmond, York/Yorktown, Rappahannock/Fredericksburg, and Potomac/Alexandria relationships. It remains a separate game with its own release.

- Source and content: [games/virginia-navigator](games/virginia-navigator/)
- Build: `npm run build`
- Test: `npm test`
- [Sources](docs/SOURCES.md) · [Test notes](docs/TESTING.md)

## Playing and sharing

Download a game's HTML file, then open it locally in Chrome. Each release runs without internet, installation, or login. Google Drive can distribute the file; students download it rather than play inside Drive preview. Check local-file support on managed student devices.

## Adding future games

Create a separate `games/<game-name>/` folder containing its README, source, content, and any assets. Give each game an independent build command and a uniquely named standalone HTML release, then add it to the catalog above. Preserve existing games when adding new ones. Node.js 20+ is needed only for development; builds and model tests require no package installation.

All releases must embed their scripts, styles, content, fonts, and assets. No runtime APIs, CDNs, analytics, remote assets, or server requirement. Keep editable source separate from generated releases and rebuild rather than editing exported HTML. Share helpers only when multiple games actually need them.
