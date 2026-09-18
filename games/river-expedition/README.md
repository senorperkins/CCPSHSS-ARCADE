# River Expedition — James River (0.11)

A four-stop pixel-art journey with continuous steering, randomized hazards, automatic landings, and a Fall Line portage. Each stop has **dock map → five correct docking answers → an information blurb → five correct camp answers**. Forty questions make this a longer session than the original 5–8 minute prototype; classroom timing remains to be measured.

## Play

Open `dist/River-Expedition-James-River.html` from the repository root directly in Chrome. Upload this one file to Google Drive for students to download and open locally. Drive preview is not the game player. No internet, server, installation, login, or student records are required.

- **A/D or left/right:** steer. **W/up:** move faster. **S/down:** move slower.
- **Mouse/finger:** hold the river to steer toward that spot. The directional pad defaults on for touch devices; toggle it in Help.
- **Automatic docking:** reach the landing. The boat moves into the dock and the question sequence opens automatically. There is no Dock button or docking key.
- **P/Escape:** pause/resume. Map, Journal, and Help also pause travel. Losing window focus pauses it automatically.
- **Five hearts:** each impact removes one heart, followed by two protected seconds. Collect floating hearts to restore one heart, up to the maximum of five. Landings repair all hearts. At zero, take a repair/rest break and resume nearby with four protected seconds. Discoveries remain intact. On the trail, hearts represent crew energy.
- **Questions:** choose an answer, read the feedback, then continue. Each set requires five correct answers. Wrong answers open a short hint without revealing the answer, then return to the same question with all choices available. Correct progress is kept and retries cost no hearts. Answer choices shuffle each run; approved question wording remains stable.

The map reveals real places only after you reach them. The fictional supply landing and base camp are listed as reached stops without invented geographic pins.

## Difficulty and replay

All four sections target 75 seconds of unobstructed default travel. Speeds increase 62 → 76 → 90 → 104 game units/second, and lengths increase proportionally. The last section remains a shore portage and moves forward automatically. Faster/slower controls are proportional; Gentle pace affects every section equally. Collisions and pauses add time. Water saturation and obstacle count increase with each section.

Every launch/replay draws a new random seed. Hazards are generated within authored channel bounds with safe spacing, a clear opening stretch, and a hazard-free landing approach. They do not spawn on top of the player during travel. A given seed reproduces its layout; Help displays the seed for debugging. River-course geometry and real geographic facts are deliberately not randomized.

## Build and test

From the repository root, using Node.js 20+:

```sh
npm run build:river
node --test games/river-expedition/tests/model.test.mjs
```

No dependencies are needed for the build/model tests. On restricted hosts with Node 24, use `--test-isolation=none`. Optional browser tests use Playwright:

```sh
node games/river-expedition/tests/browser.mjs
```

Set `PLAYWRIGHT_MODULE` and `CHROME_PATH` if needed. These are developer test dependencies only. The browser suite opens the real HTML by file URL with networking disabled, exercises all 40 questions, and checks auto-docking, hearts, recovery, reveal rules, randomized replay, keyboard/mouse/touch, and viewport layout. Travel is accelerated between UI checkpoints; the model suite continuously simulates full routes.

## Architecture and guidance

See [ARCHITECTURE.md](ARCHITECTURE.md), [sources](docs/SOURCES.md), [test results](docs/TESTING.md), and [the Osorio design pass](docs/OSORIO-REVIEW.md). Source, pixel sprites, level content, and final release remain separate. Virginia Navigator is unchanged.

## Remaining gaps

Physical managed Chromebooks/tablets, student reading level, session length, and classroom pacing need testing. The navigation scene requires visual steering; text panels and questions support keyboard/live feedback, but this is not a complete nonvisual game. No saved progress after reload, narration, or soundtrack yet. The scrolling course and shore trail are compressed simulations, not real river geometry or boating guidance. This covers selected Virginia Studies concepts, not full blueprint mastery.

Version 0.4 simplifies the player interface: no visible auto-dock line, docking target rectangle, upstream label, stop counters, question-set labels, or damage messages. Arrival shows a welcome and map; five correct answers lead to the Field Note, then camp questions. Completing camp resumes travel directly. Collision rings and hearts show damage. All 40 hints were rewritten to avoid naming the answer.

## Curriculum

Forty original four-choice SOL-style questions are matched to the region visited. See [the teacher crosswalk](docs/CURRICULUM.md) for each question’s 2023 standard, answer, region, and source. These practice selected concepts, not the full SOL blueprint.

Separate [QA](docs/QA-0.6.md) and [adversarial gameplay](docs/REDTEAM-0.6.md) passes informed version 0.6.

Version 0.7 adds an illustrated first-play introduction, branch/rock variants, detailed shallow-water art, and unboxed hearts. See [asset QA](docs/ASSET-QA-0.7.md). Restarts skip the introduction.

Version 0.9 raises starting pace, increases obstacles, and refines canoe/shadow art; see [QA notes](docs/QA-0.9.md).

## Shared build manifest

The game.json manifest selects source files for the shared exporter. Run npm run build -- river-expedition (or npm run build:river) from the repository root. npm run test:river rebuilds and runs this game's model/export checks; npm run test:all rebuilds and tests both games. npm run test:browser:river runs optional offline Chrome integration (Playwright required). Both games' flat dist/ HTML files are intentionally committed. Browser evidence is written under ignored test-results/; existing documentation screenshots remain historical evidence. See [shared build guidance](../../shared/build/README.md) and [third-party licenses](../../THIRD_PARTY_LICENSES.md).
