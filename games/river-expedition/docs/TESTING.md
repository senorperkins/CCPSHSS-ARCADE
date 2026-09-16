# Verification — version 0.6

Fourteen model/export tests pass, including pickup healing/capping/single-use, pickup fairness across 100 seeds per leg, and repeated wrong-answer hint gating. Other coverage: continuous steering/pause; heart loss and protection; zero-heart repair retaining discoveries; automatic docking from both sides with a single arrival; longer/faster water legs and minimum hazard spacing; deterministic same-seed/different-seed layouts; complete continuously simulated routes with repair; every question/retry/blurb transition; and a network-free export.

The offline Chrome integration suite opens the actual standalone file by `file:///` and verifies:

- Keyboard and mouse movement; held/released touch movement.
- Visible heart loss, zero-heart repair, restored hearts, and single-use pickups capped at five hearts.
- Automatic docking from the opposite side of the river, with no action button.
- Dock map before questions at all four stops; all forty required correct answers through the interface; eight hint/retry checks without answer reveal or heart penalties; and all four intervening field notes.
- Map labels appear only after reaching their locations.
- Replay changes seed/layout and clears prior discoveries.
- Hidden desktop control pad, visible touch pad, no phone overflow, and a 1366×768 playfield/HUD fitting onscreen.
- Zero JavaScript page errors and zero HTTP/HTTPS requests.

See `browser-results.json` and the `v06-*.png` screenshots. Earlier unprefixed screenshots document version 0.1 only. Browser UI tests accelerate travel between landings; the model suite traverses routes continuously. Questions are not bypassed in the browser test.

Remaining: physical device/managed Chromebook check, classroom reading/pacing trials, screen-reader audit, and statistical balance testing over many seeds. The forty-question version intentionally takes longer than the original prototype. The live scene still requires visual steering.

Version 0.4 simplifies the player interface: no visible auto-dock line, docking target rectangle, upstream label, stop counters, question-set labels, or damage messages. Arrival shows a welcome and map; five correct answers lead to the Field Note, then camp questions. Completing camp resumes travel directly. Collision rings and hearts show damage. All 40 hints were rewritten to avoid naming the answer.

Version 0.5 adds a content contract: all 40 items have four distinct choices, a standard, region, resolvable source, and no full correct choice in the hint. Browser testing exercises all revised items. The adopted standards and selected public released item pages were reviewed separately; automated tests cannot certify pedagogical quality or official test equivalence.

0.6: equal travel-time regression covers all four legs and six speed/assist combinations; maximum-speed spacing checked. Offline Chrome checks optional-panel Escape and reaches the final camp without forward keyboard input. Separate QA and adversarial findings are in QA-0.6.md and REDTEAM-0.6.md.
