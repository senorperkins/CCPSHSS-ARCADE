import {readdirSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {buildGame} from '../shared/build/build.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
if(args.length!==1) throw Error('Usage: node tools/build-game.mjs <game-slug|--all>');
const slugs=args[0]==='--all'?readdirSync(root+'games').filter(s=>existsSync(root+'games/'+s+'/game.json')).sort():args;
const outputs=new Set();
// Validate all selected games before writing any output; reject filename collisions.
for(const slug of slugs){const {output}=await buildGame(root,slug,{write:false});if(outputs.has(output))throw Error('Duplicate output: '+output);outputs.add(output);}
for(const slug of slugs)await buildGame(root,slug);
