// Compatibility entry point; canonical configuration is games/virginia-navigator/game.json.
import {buildGame} from '../shared/build/build.mjs';
import {fileURLToPath} from 'node:url';
await buildGame(fileURLToPath(new URL('../',import.meta.url)),'virginia-navigator');
