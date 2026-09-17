# River Expedition architecture — 0.4

The exporter embeds the HTML/CSS, original pixel sprites, geography, level pack, and ordered local modules into one standalone HTML file. There is no runtime package, CDN, fetch, external font, or server dependency. CSP blocks runtime network access. The older Virginia Navigator source/release is independent.

## Boundaries

| File | Responsibility |
| --- | --- |
| `content/james.json` | Places and reveal conditions, legs, speeds/distances, hazards, 40 sourced questions, answer keys, hints, explanations, four field notes, journal entries |
| `assets/sprites.js` | Original limited-palette pixel assets, converted to in-memory sprite canvases |
| `src/model.js` | Fixed-step movement, seeded hazard generation, collisions/hearts, repair, line triggers, docking animation, visited places and journal |
| `src/review.js` | Pure docking/blurb/camp question state machine, seeded answer order, answer validation and retry protection |
| `src/render.js` | Reads simulation state to draw the world, landing lines, impacts, and the boat/crew |
| `src/input.js` | Keyboard and pointer inputs; held controls clear on cancellation, blur, or modal transitions |
| `src/game.js` | DOM panels, focus/inert state, loop/event dispatch, fresh seed generation, progressive atlas, access settings |

## Progression and failure

`title → play → docking → checkpoint → play … → complete`

A checkpoint runs `dock map → dock questions (5 correct) → field note → camp questions (5 correct) → done`. Correct answers require an explicit Next action so explanations remain readable. Wrong answers open a separate hint panel, then return to the same question with every choice available. The hint must be dismissed before retrying; only a correct answer permits advancement. They never mutate health. Completed notes are recorded once when leaving the stop.

An end-line trigger works at any legal horizontal position. It records the stop once, animates the boat/crew for 0.85 seconds, then emits one arrival event. During docking and questions, collisions cannot reduce health. A pause remembers whether it interrupted travel or docking.

An impact costs one of five hearts and grants two seconds of protection. At zero: `play → rescue → play`. Repair moves the player back 120 game units, restores five hearts, and grants four protected seconds. It does not erase discoveries or reroll hazards. Single-use seeded heart pickups restore one heart, capped at five; collection at full health consumes the pickup without increasing health. Pickups retain their collected state through rescue. Landings also restore condition. Walking uses the same condition system as crew energy.

## Randomness and fairness

The browser supplies a new cryptographic 32-bit seed on launch/replay. Tests can supply an explicit seed. Each leg derives a deterministic hazard sequence; answer choice order has its own derived stream. Authored leg parameters constrain obstacle types and density. Longitudinal jitter preserves at least 1.4 seconds of base-speed spacing, with a protected opening and landing approach. Heart pickups use a separate seeded stream and are placed in reachable spaces between hazards. Real locations and curriculum facts never change with randomness.

## Future river packs

Keep the schema versioned. A leg needs a mode, length, speed, channel parameters, hazard types/count, objective/arrival copy, a field note, two arrays of exactly five questions, and journal text. Questions require stable unique ids, valid answer indices, distinct instructional hints, explanations, and source metadata. Places use `revealAt` to refer to a reached leg id; null means visible at the start. Fictional stops should not receive fabricated geographic coordinates.

The movement, damage, docking, review, and journal systems are reusable. Before adding a second river, parameterize the remaining James-specific renderer landmarks, title strings, and atlas viewport and add a pack selector to the exporter. Do not relabel a James pack while retaining its historical facts. The build rejects incomplete question sets and invalid answers.

## Offline/privacy and testing

Only in-memory game state is retained. No student identity, analytics, external requests, or persistence is required. The deterministic build produces `dist/River-Expedition-James-River.html`. Browser automation belongs in development, never the release. Tests cover simulation, state transitions, fairness constraints, all 40 questions, and the actual file-URL export with offline Chrome.

Version 0.4 simplifies the player interface: no visible auto-dock line, docking target rectangle, upstream label, stop counters, question-set labels, or damage messages. Arrival shows a welcome and map; five correct answers lead to the Field Note, then camp questions. Completing camp resumes travel directly. Collision rings and hearts show damage. All 40 hints were rewritten to avoid naming the answer.
