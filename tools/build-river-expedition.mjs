import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const game=root+'games/river-expedition/';
const read=p=>readFileSync(game+p,'utf8');
const level=JSON.parse(read('content/james.json'));
if(level.schemaVersion!==1||level.legs.length<1)throw Error('Unsupported content pack');
const questionIds=new Set();
for(const leg of level.legs){
 if(!['boat','walk'].includes(leg.mode)||!Number.isFinite(leg.length)||leg.length<=600)throw Error('Invalid leg '+leg.id);
 if(!leg.fieldNote?.text)throw Error('Missing field note: '+leg.id);
 for(const stage of ['dock','camp']){
  if(leg.questions?.[stage]?.length!==5)throw Error('Expected five '+stage+' questions: '+leg.id);
  for(const q of leg.questions[stage]){
   if(questionIds.has(q.id)||!q.prompt||!q.explanation||!q.hint||q.hint===q.explanation||!level.questionSources[q.source]||!Array.isArray(q.choices)||q.choices.length<2||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.choices.length)throw Error('Invalid question: '+q.id);
   questionIds.add(q.id);
  }
 }
}
const bundle=['assets/sprites.js','src/model.js','src/review.js','src/render.js','src/input.js','src/game.js'].map(p=>`\n// ${p}\n`+read(p).replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'')).join('\n');
const data=`const LEVEL=${JSON.stringify(level)};\nconst MAP_DATA=${read('content/boundaries.json')};\nconst HYDRO=${read('content/hydrography.json')};\n`;
let html=read('src/index.html').replace('/* STYLES */',()=>read('src/style.css')).replace('/* GAME */',()=>(data+bundle).replaceAll('</script','<\\/script'));
if(/<(?:script|link|img)[^>]+(?:src|href)\s*=/i.test(html)||/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(html))throw Error('External runtime dependency in release');
mkdirSync(root+'dist',{recursive:true});writeFileSync(root+'dist/River-Expedition-James-River.html',html);console.log(`Built dist/River-Expedition-James-River.html (${Buffer.byteLength(html)} bytes)`);
