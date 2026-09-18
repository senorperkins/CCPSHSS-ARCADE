import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,relative,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {validateOffline} from './validate.mjs';
function inside(base,path) {
 if(typeof path!=='string'||!path) throw Error('Expected a relative file path');
 const full=resolve(base,path),rel=relative(base,full);
 if(isAbsolute(path)||rel==='..'||rel.startsWith('..'+(process.platform==='win32'?'\\':'/'))) throw Error('Path escapes game directory: '+path);
 return full;
}
export async function buildGame(root,slug,{write=true}={}) {
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw Error('Invalid game slug');
 const game=resolve(root,'games',slug),read=p=>readFileSync(inside(game,p),'utf8');
 const m=JSON.parse(read('game.json'));
 if(m.schemaVersion!==1||!Array.isArray(m.data)||!Array.isArray(m.scripts)||!m.scripts.length||!['compact','annotated'].includes(m.format)||!/^[-A-Za-z0-9]+\.html$/.test(m.output)) throw Error('Invalid game manifest: '+slug);
 const values={},names=new Set();
 const data=m.data.map(d=>{
  if(!/^[A-Z][A-Z0-9_]*$/.test(d.name)||names.has(d.name)) throw Error('Invalid/duplicate data binding');
  names.add(d.name);const raw=read(d.path);values[d.name]=JSON.parse(raw);
  return 'const '+d.name+'='+ (d.raw?raw:JSON.stringify(values[d.name]))+';';
 }).join(m.format==='annotated'?'\n':'')+'\n';
 if(m.validator) {const {default:validate}=await import(pathToFileURL(inside(game,m.validator)));await validate(values);}
 const bundle=m.scripts.map(p=>{
  const source=read(p);
  return m.format==='annotated'?'\n// '+p+'\n'+source.replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,''):source.replaceAll('export ','');
 }).join('\n');
 let html=read(m.template);
 for(const marker of ['/* STYLES */','/* GAME */']) if(html.split(marker).length!==2) throw Error('Expected exactly one '+marker);
 html=html.replace('/* STYLES */',()=>read(m.styles)).replace('/* GAME */',()=>(data+bundle).replaceAll('</script','<\\/script'));
 validateOffline(html);
 if(write){mkdirSync(resolve(root,'dist'),{recursive:true});writeFileSync(resolve(root,'dist',m.output),html);console.log('Built dist/'+m.output+' ('+Buffer.byteLength(html)+' bytes)');}
 return {html,output:m.output};
}
