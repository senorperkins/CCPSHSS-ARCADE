import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=fileURLToPath(new URL('../',import.meta.url));
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
try {
 for(const touch of [false,true]) {
  const context=await browser.newContext({offline:true,hasTouch:touch,viewport:touch?{width:390,height:844}:{width:1366,height:768}});
  const page=await context.newPage(),errors=[],network=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
  await page.goto(pathToFileURL(root+'dist/Virginia-Navigator.html').href);
  for(let route=0;route<4;route++) {
   let guard=0;
   while(!await page.evaluate(()=>state.done)) {
    assert(++guard<40);
    const step=await page.evaluate(()=>({river:river().id,index:state.index+mission().direction,carry:mission().portage&&state.index===river().fall&&state.mode==='boat'}));
    if(step.carry)await page.locator('#carry').click();
    const marker=page.locator(`[data-river="${step.river}"][data-index="${step.index}"]`);
    if(touch)await marker.tap();else {await marker.focus();await page.keyboard.press('Enter');}
   }
   await page.locator('#next').click();
  }
  assert(await page.locator('#completion').isVisible());
  await page.locator('#replay').click();assert.equal(await page.evaluate(()=>missionIndex),0);assert.equal(await page.evaluate(()=>state.done),false);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);assert.deepEqual(network,[]);
  await context.close();
 }
 console.log('Virginia Navigator: all four routes, portage, replay, keyboard and touch; offline file URL, no JS errors or HTTP requests.');
} finally {await browser.close();}
