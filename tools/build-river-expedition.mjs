// Compatibility entry point; canonical configuration is games/river-expedition/game.json.
import {buildGame} from '../shared/build/build.mjs';
import {fileURLToPath} from 'node:url';
await buildGame(fileURLToPath(new URL('../',import.meta.url)),'river-expedition');
