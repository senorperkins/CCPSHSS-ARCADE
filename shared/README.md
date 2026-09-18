# Shared code

**Second use proves the abstraction.** Extract a helper only after two games need the same behavior and its API preserves both. Keep game rules, content, rendering, and engine decisions in each game. Do not build a framework for hypothetical future games.

- input/: candidate input helpers after two proven uses.
- accessibility/: candidate focus, announcements, and reduced-motion helpers.
- ui/: candidate small UI utilities, not a shared game shell.
- audio/: candidate audio helpers; no audio implementation is currently shared.
- build/: proven common single-file assembly and offline validation, used by both games.

Only build code is extracted now. The other categories contain guidance, not runtime dependencies. Any extraction needs both games' tests and offline release checks.
