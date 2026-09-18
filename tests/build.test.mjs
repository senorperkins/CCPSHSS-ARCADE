import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {buildGame} from '../shared/build/build.mjs';
import {validateOffline} from '../shared/build/validate.mjs';
import validateRiver from '../games/river-expedition/validate-content.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
test('both manifests reproduce committed releases deterministically',async()=>{
 for(const slug of ['virginia-navigator','river-expedition']) {
  const a=await buildGame(root,slug,{write:false}),b=await buildGame(root,slug,{write:false});
  assert.equal(a.html,b.html);
  assert.equal(a.html.replaceAll('\r\n','\n'),readFileSync(root+'dist/'+a.output,'utf8').replaceAll('\r\n','\n'));
 }
});
test('offline guard rejects linked assets, network calls, imports, CSS loads, and unfinished templates',()=>{
 const csp="connect-src 'none'";
 for(const bad of ['<script src="x.js"></script>','<iframe src="x"></iframe>','fetch("x")','new WebSocket("x")','import("x")','url(https://example.com/x)','/* GAME */'])assert.throws(()=>validateOffline(csp+bad));
 assert.throws(()=>validateOffline('<html></html>'));
 assert.doesNotThrow(()=>validateOffline(csp+'const source="https://example.com";'));
});
test('river content validation still rejects malformed packs and questions',()=>{
 const level=JSON.parse(readFileSync(root+'games/river-expedition/content/james.json'));
 for(const mutate of [l=>l.schemaVersion=2,l=>l.legs[0].length=1,l=>l.legs[0].fieldNote.text='',l=>l.legs[0].questions.dock.pop(),l=>l.legs[0].questions.dock[0].correct=99,l=>l.legs[0].questions.dock[0].source='missing',l=>l.legs[0].questions.dock[1].id=l.legs[0].questions.dock[0].id]){
  const copy=structuredClone(level);mutate(copy);assert.throws(()=>validateRiver({LEVEL:copy}));
 }
});
test('invalid game selectors fail closed',async()=>{await assert.rejects(buildGame(root,'../river-expedition',{write:false}));});
