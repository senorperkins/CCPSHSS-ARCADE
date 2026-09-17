# Osorio Systems design pass — 0.2

Source: [Osorio Systems — Game Design Bible](https://docs.google.com/document/d/1wkYDwqmYhZPBUaaZhxapXS30RxD87fcuafHEaR0UDZ8/edit), found and read through the connected Google Drive plugin on 2026-09-16. This note summarizes the relevant core standards, not the entire document. The source document was not edited or copied into the release.

| Core standard applied | Concrete implementation |
| --- | --- |
| Remove friction that does not serve play | Crossing a visible gold line triggers an 0.85-second automatic docking animation; no alignment puzzle or action key |
| Immediate, layered feedback | Filled/empty hearts plus numeric condition, an impact label above the boat, slowdown, and explanatory text |
| Recoverable failure | Two seconds of impact protection; at zero hearts, repair and resume nearby with discoveries intact; four protected seconds after rescue |
| Deliberate discovery | The atlas labels only the starting point and reached real locations; fictional stops appear in the reached-stop list without invented coordinates |
| Progression beyond punishment | Longer, faster legs combine wider/shallow tidal water, mixed hazards, then rocks and current; minimum obstacle spacing preserves reaction time |
| Explicit, reproducible randomness | New cryptographic run seed on launch/replay; pure seeded hazard generation supports exact reproduction in tests |
| Reusable, data-driven systems | Forty questions, answer keys, explanations, source metadata, four blurbs, speed, and distance live in the level pack; quiz transitions are pure rules |
| Accessibility and information hierarchy | Keyboard directions move to Help; touch pad appears for coarse pointers and can be toggled; question panels pause travel and never drain hearts |

The user explicitly requested five docking questions, a blurb, and five camp questions at every stop. This deliberately increases reading/question time versus the first version. We retained continuous navigation, cargo/portage context, no timers, explanations, and retries. Classroom testing should determine whether ten questions per stop supports retention or interrupts flow too often; no claim of classroom validation is made.

Remaining improvements worth testing: physical Chromebook/tablet handling, question reading level and distractor quality, session duration, how often children need rescue, and whether the later current feels meaningfully different rather than only faster. Sound and narration remain future work.
