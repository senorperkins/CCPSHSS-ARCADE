# Single-file build helpers

Both games use build.mjs and validate.mjs through tools/build-game.mjs. Run commands from the repository root:

```sh
npm run build:all
npm run build -- virginia-navigator
npm run build -- river-expedition
npm run test:all
```

Each games/<slug>/game.json declares schemaVersion (1), template, styles, ordered data bindings, ordered scripts, output (flat HTML filename), format, and an optional game-local validator module. Paths are relative to the game directory. Data must parse as JSON; raw preserves existing JSON whitespace. Validators receive parsed bindings and throw on invalid content before any output is written. River's original content checks remain in its validator.

The compact and annotated formats preserve the two existing exporters' concatenation exactly. This is deliberately a small assembler, not a general ES module bundler: annotated mode strips single-line imports and leading exports; compact mode strips export keywords. Add scripts explicitly in dependency order. Do not introduce arbitrary module syntax without extending the tooling and tests. The validator rejects remaining imports, runtime network APIs, linked runtime assets, CSS resource loads, unfilled template markers, and missing network-blocking CSP. Metadata source URLs are permitted.

Outputs are generated under root dist/ and intentionally committed. Never edit generated HTML. The old tools/build.mjs and tools/build-river-expedition.mjs are compatibility wrappers only. No package installation is needed for builds/model tests; optional browser tests require Playwright and Chrome.
